
import { Request, Response, NextFunction } from 'express';
import  { db } from '@/app';
const passport = require('passport')


export const postSearch = (req: Request, res: Response) => {
    // #swagger.tags = ['post']
    // 검색어에 숫자가 있어도 일치시키기 위한 정규식
    const searchValue: any = req.query.value; // 타입을 명시적으로 지정
    console.log(typeof searchValue);
    if (!searchValue) {
        return res.status(400).send('검색어를 입력해주세요.');
    }

    const regexPattern = new RegExp(searchValue, 'i');
    console.log(regexPattern);

    let searchPost = [
        {
            $search: {
                index: 'titleSearch',
                text: {
                    query: searchValue,
                    path: '제목', // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
                },
            },
        },
        { $sort: { _id: 1 } },
        { $limit: 10 },
    ];
    // console.log(req.query.value);
    db.collection('post')
        .aggregate(searchPost)
        .toArray((err: Error, result: any) => {
            if (err) {
                // 오류 처리
                console.log(err);

                return res
                    .status(500)
                    .send('검색 결과를 가져오는 도중 오류가 발생했습니다.');
            }
            console.log('검색 결과:', result);
            console.log('검색 정규식:', regexPattern);
            res.render('search.ejs', { posts: result ?? [] });
        });
}

export const postWrite = (req: Request | any, res: Response, next: NextFunction) => {
    // #swagger.tags = ['post']
    console.log('글쓰기')
    db.collection('count').findOne(
        { name: '게시물갯수' },
        (err: Error, result: any) => {
            let total = result.totalPost;
            let storage = {
                _id: total + 1,
                // 현재 로그인한 사람 정보
                작성자: req.user.id,
                제목: req.body.title,
                날짜: req.body.date,
                내용: req.body.content,
            };  
            db.collection('post').insertOne(
                storage,
                (err: any, result: any) => {
                    db.collection('count').updateOne(
                        { name: '게시물갯수' },
                        { $inc: { totalPost: 1 } },
                        (err: Error, result: any) => {
                            if (err) {
                                return console.log(err);
                            }
                            console.log(result,"글쓰기")
                            if (req.headers.host=== 'localhost:8000'&&req.headers.origin === 'localhost:8000') {
                                console.log("내부로 넘어감")
                                res.redirect('/list');
                            }else{
                                console.log("성공")
                                res.status(200).json({succeed:true, postId:total + 1})
                            }
                        }
                    );
                    
                }
            );
        }
    );
}

export const postList = (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['post']
    // 작성자 정보 가져오기

    const pageNumber = parseInt(req.query.page as string) || 1; // 클라이언트에서 전달된 페이지 번호
    const itemsPerPage = 10; // 페이지당 게시글 수

    db.collection('login')
        .find()
        .toArray((err: Error, loginResult: any) => {
            if (err) {
                // 오류 처리
                return next(err);
            }

            // 전체 게시글 수 계산
            db.collection('post').countDocuments({}, (err: Error, totalCount: number) => {
                if (err) {
                    // 오류 처리
                    return next(err);
                }

                // 페이징 계산
                const totalPages = Math.ceil(totalCount / itemsPerPage);
                const skipCount = (pageNumber - 1) * itemsPerPage;

                // 게시물 가져오기
                db.collection('post')
                    .find()
                    .skip(skipCount)
                    .limit(itemsPerPage)
                    .toArray((err: Error, postResult: any) => {
                        if (err) {
                            // 오류 처리
                            return next(err);
                        }

                        // 게시물 작성자 정보를 포함하여 렌더링
                        if(req.headers.host=='localhost:8000'){
                            res.render('list.ejs', {
                                loginData: loginResult,
                                posts: postResult,
                                getAuthorName: getAuthorName,
                            });
                        }else{
                            const data ={data: postResult};
                            res.status(200).json(data)
                        }
                    });
            });
        });
}
export const postDelete=(req: Request | any, res: Response) => {
    // #swagger.tags = ['post']
    // db에서 삭제하기
    console.log(req.body);

    // 로그인 사용자 ID 확인
    const loggedInUserId = req.user.id;
    // 클라이언트에서 전달된 _id 값
    const postId = parseInt(req.body._id);
    // 실제 로그인 유저 ID와 글에 저장된 작성자 ID 일치 여부 확인
    const deleteData = { _id: postId, 작성자: loggedInUserId };

    console.log('작성자 ID:', loggedInUserId);
    console.log('_id 값:', postId);

    db.collection('post').findOne(deleteData, (err: Error, post: any) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: '오류가 발생했습니다.' });
            return;
        }

        if (!post) {
            // 작성자와 일치하는 글이 없는 경우
            res.status(403).send({ message: '내가 쓴 글이 아닙니다.' });
            return;
        }

        // 일치하는 글이 있는 경우 삭제 수행
        db.collection('post').deleteOne(
            deleteData,
            (err: Error, result: any) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ message: '오류가 발생했습니다.' });
                    return;
                }

                res.status(200).send({ message: '성공했습니다.' });
            }
        );
    });
}

export const postEditView=(req: Request | any, res: Response, next: NextFunction) => {
    // #swagger.tags = ['post']
    const postId = parseInt(req.params.id);
    const loggedInUserId = req.user?.id;

    db.collection('post').findOne(
        { _id: postId },
        (err: Error, result: any) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ message: '에러가 발생했습니다.' });
            }
            // 작성자와 로그인한 사용자가 같은 경우에만 수정 페이지를 렌더링

            if (result && result.작성자 === loggedInUserId) {
                if(req.headers.host=='localhost:8000')res.render('edit.ejs', { post: result });
            } else {
                // 작성자와 로그인한 사용자가 다른 경우, 또는 글이 없는 경우 에러 메시지를 전송
                res.status(403).json({
                    message: '수정할 수 있는 권한이 없습니다.',
                });
            }
        }
    );
}

export const postEditRequest=(req: Request | any, res: Response, next: NextFunction) => {
    // #swagger.tags = ['post']
    const postId = parseInt(req.body.id);
    const loggedInUserId = req.user?.id;

    db.collection('post').findOne(
        { _id: postId },
        (err: Error, result: any) => {
            if (err) {
                return next(err);
            }

            // 작성자와 로그인한 사용자가 같은 경우에만 글을 수정합니다.
            if (result && result.작성자 === loggedInUserId) {
                db.collection('post').updateOne(
                    { _id: postId },
                    {
                        $set: {
                            제목: req.body.title,
                            날짜: req.body.date,
                            내용: req.body.content,
                        },
                    },
                    (err: Error, result: any) => {
                        if (err) {
                            return next(err);
                        }
                        console.log('수정!');
                        // /list로 이동
                        res.redirect('/list');
                    }
                );
            } else {
                res.status(403).json({
                    message: '수정할 수 있는 권한이 없습니다.',
                });
            }
        }
    );
}

export const postDetail=(req: Request, res: Response) => {
    // #swagger.tags = ['post']
    console.log('게시글보기')
    try {
        db.collection('post').findOne(
            { _id: parseInt(req.params.id) },
            (err: Error, result: any) => {
                if(req.headers.host=='localhost:8000'&&req.headers.origin=='localhost:8000'){
                   return res.render('detail.ejs', { data: result });
                }else{
                    if(result==null){
                        return res.status(404).end()
                    }
                    res.status(200).json({succeed:true,data:result})
                }
                
            }
        );
        } catch (error) {
            console.log(error,"게시글 보기오류")
            res.status(500).end()
        }
}

function getAuthorName(authorId: any, loginData: any) {
    // 작성자 id를 사용하여 작성자 이름을 가져오는 로직 구현
    const author =
        loginData && loginData.find((login: any) => login.id === authorId);
    return author ? author.name : '';
}