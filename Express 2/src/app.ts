import express, { Request, Response, NextFunction } from 'express';
const app = express();
// socket.io 사용하기
// const http = require('http');
// const server = http.createServer(app);

const methodOverride = require('method-override');
const MongoClient = require('mongodb').MongoClient;
const flash = require('connect-flash');
require('dotenv').config();
// 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.use(methodOverride('_method'));

// 로그인 실패 시 알림창을 표시하기 위해
app.use(flash());
app.set('view engine', 'ejs');

let db: any;
MongoClient.connect(
    process.env.DB_URL,
    { useUnifiedTopology: true },
    (err: Error, client: any) => {
        // 에러날 시
        if (err) return console.log(err);

        // hansei db에 연결하기
        db = client.db('hansei');

        // 서버 실행
        app.listen(process.env.PORT, () => {
            console.log(`🛡️  Server listening on port: 8000🛡️`);
        });
    }
);

// 메인 페이지
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('index.ejs');
});

// 회원 인증
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

// 회원 인증 미들웨어: 요청, 응답 사이에 실행되는 코드
app.use(
    session({ secret: '비밀코드', resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// /login - 로그인 페이지
app.get('/login', (req: Request, res: Response, next: NextFunction) => {
    res.render('login.ejs');
});
// 로그인 실패하면 /fail로 리다이렉트
app.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/fail',
        failureFlash: true,
    }),
    (req: Request | any, res: Response, next: NextFunction) => {
        req.login(req.user, (err: Error) => {
            if (err) {
                return next(err);
            }
        });
        console.log('성공');
        res.send('성공했어요');
    }
);
app.get('/fail', (req: Request | any, res: Response, next: NextFunction) => {
    const errorMessage = req.flash('error')[0];
    res.send(`
        <script>
            alert("${errorMessage}");
            window.location.href = "/login";
        </script>
    `);
});

// 아이디 비번 인증하는 세부 코드
passport.use(
    new LocalStrategy(
        {
            // input에서 name 속성들
            usernameField: 'id',
            passwordField: 'pw',
            // 로그인 후 세션 저장할것인지
            session: true,
            // 아이디, 비번 말고 다른 정보 검증하고 싶은지
            passReqToCallback: false,
        },
        // 사용자 아이디, 비번 검증부분
        (inputID: any, inputPW: any, done: any) => {
            db.collection('login').findOne(
                { id: inputID },
                (err: Error, result: any) => {
                    // 에러처리
                    if (err) return done(err);

                    // db에 아이디가 없다면
                    if (!result)
                        return done(null, false, {
                            message: '존재하지않는 아이디',
                        });
                    // db에 아이디가 있다면 db 비번과 입력 비번 비교
                    if (inputPW === result.pw) {
                        return done(null, result, {
                            message: '로그인 성공 메시지',
                        });
                    } else {
                        return done(null, false, { message: '비번틀렸어요' });
                    }
                }
            );
        }
    )
);

// 세션 만들기
// id 이용해 세션 저장 코드 - 로그인 성공시 발동, 아이디, 비번 검증 성공시 result값이 성공할 시 user로 보냄
passport.serializeUser((user: any, done: any) => {
    // 세션 데이터를 만들고 id정보를 쿠키로 보냄
    done(null, user.id);
});
// 세션 데이터를 가진 사람을 db에서 찾는 코드 - 마이 페이지 접속시
passport.deserializeUser((id: any, done: any) => {
    db.collection('login').findOne({ id: id }, (err: Error, result: any) => {
        done(null, result);
    });
});

// /mypage - 마이 페이지
app.get(
    '/mypage',
    loginUser,
    (req: Request | any, res: Response, next: NextFunction) => {
        console.log(req.user);

        res.render('mypage.ejs', { userMe: req.user });
    }
);
// 마이페이지 접속전 미들웨어
function loginUser(req: Request | any, res: Response, next: any) {
    if (req.user) {
        // 요청 user 있으면 통과
        next();
    } else {
        res.send('로그인 안함!');
    }
}

// /join - 회원가입 페이지
app.get('/join', (req: Request | any, res: Response, next: NextFunction) => {
    res.render('join.ejs');
});

app.post('/join', (req: Request, res: Response, next: NextFunction) => {
    // login 컬렉션에 회원가입 정보 저장하기
    db.collection('login').insertOne(
        { id: req.body.id, pw: req.body.pw },
        (err: Error, result: any) => {
            console.log('저장완료!!!');
        }
    );
    res.redirect('/login');
});

// /search - 검색 페이지
app.get('/search', (req: Request, res: Response) => {
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
});

// /write 글 작성 페이지
app.get('/write', (req: Request, res: Response, next: NextFunction) => {
    res.render('write.ejs');
});

// /write - form 데이터 /write-page로 POST 요청
app.post(
    '/write-page',
    (req: Request | any, res: Response, next: NextFunction) => {
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
                                res.redirect('/list');
                            }
                        );
                    }
                );
            }
        );
    }
);

// /list GET 요청 처리
app.get('/list', (req: Request, res: Response, next: NextFunction) => {
    // 작성자 정보 가져오기
    db.collection('login')
        .find()
        .toArray((err: Error, loginResult: any) => {
            if (err) {
                // 오류 처리
                return next(err);
            }

            // 게시물 가져오기
            db.collection('post')
                .find()
                .toArray((err: Error, postResult: any) => {
                    if (err) {
                        // 오류 처리
                        return next(err);
                    }

                    // 게시물 작성자 정보를 포함하여 렌더링
                    res.render('list.ejs', {
                        loginData: loginResult,
                        posts: postResult,
                        getAuthorName: getAuthorName,
                    });
                });
        });
});

// getAuthorName 함수 정의
function getAuthorName(authorId: any, loginData: any) {
    // 작성자 id를 사용하여 작성자 이름을 가져오는 로직 구현
    const author =
        loginData && loginData.find((login: any) => login.id === authorId);
    return author ? author.name : '';
}

// /delete
app.delete('/delete', (req: Request | any, res: Response) => {
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
});

// /edit - 수정페이지
app.get(
    '/edit/:id',
    (req: Request | any, res: Response, next: NextFunction) => {
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
                    res.render('edit.ejs', { post: result });
                } else {
                    // 작성자와 로그인한 사용자가 다른 경우, 또는 글이 없는 경우 에러 메시지를 전송
                    res.status(403).send({
                        message: '수정할 수 있는 권한이 없습니다.',
                    });
                }
            }
        );
    }
);
app.put('/edit', (req: Request | any, res: Response, next: NextFunction) => {
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
                res.status(403).send({
                    message: '수정할 수 있는 권한이 없습니다.',
                });
            }
        }
    );
});

// /detail - 상세 글 페이지
app.get('/detail/:id', (req: Request, res: Response) => {
    db.collection('post').findOne(
        { _id: parseInt(req.params.id) },
        (err: Error, result: any) => {
            res.render('detail.ejs', { data: result });
        }
    );
});
// // Socket.io 설정
// const io = require('socket.io')(server);
// io.on('connection', (socket: any) => {
//     // 클라이언트와 연결이 수립되면 실행될 코드

//     // 작성자와 로그인한 사용자가 다른 경우, 클라이언트에 알람 메시지를 전송
//     socket.on('showAlert', () => {
//         socket.emit('alertMessage', {
//             message: '수정할 수 있는 권한이 없습니다.',
//         });
//     });
// });
