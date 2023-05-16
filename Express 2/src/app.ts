import express, { Request, Response, NextFunction } from 'express';

const app = express();
const methodOverride = require('method-override');
const MongoClient = require('mongodb').MongoClient;
// 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

let db: any;
MongoClient.connect(
    'mongodb+srv://kky:1214@cluster0.5tqish3.mongodb.net/?retryWrites=true&w=majority',
    { useUnifiedTopology: true },
    (err: Error, client: any) => {
        // 에러날 시
        if (err) return console.log(err);

        // hansei db에 연결하기
        db = client.db('hansei');
        // post 컬렉션에 데이터 하나 저장하기
        // db.collection('post').insertOne(
        //     { name: 'kky', age: 26 },
        //     (err: Error, result: any) => {
        //         console.log('저장완료!!!');
        //     }
        // );

        // 서버 실행
        app.listen('8000', () => {
            console.log(`🛡️  Server listening on port: 8000🛡️`);
        });
    }
);

// 메인 페이지
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('index.ejs');
});
app.get('/list', (req: Request, res: Response, next: NextFunction) => {
    // 모든 데이터 보여주기
    db.collection('post')
        .find()
        .toArray((err: Error, result: any) => {
            console.log(result);
            // db에서 데이터 찾아서 ejs에 넣어주기
            res.render('list.ejs', { posts: result });
        });
});

// 작성 페이지
app.get('/write', (req: Request, res: Response, next: NextFunction) => {
    res.render('write.ejs');
});

// /write - form 데이터 /write-page로 POST 요청
app.post('/write-page', (req: Request, res: Response, next: NextFunction) => {
    db.collection('count').findOne(
        { name: '게시물갯수' },
        (err: Error, result: any) => {
            let total = result.totalPost;
            db.collection('post').insertOne(
                {
                    _id: total + 1,
                    제목: req.body.title,
                    날짜: req.body.date,
                },
                (err: any, result: any) => {
                    db.collection('count').updateOne(
                        { name: '게시물갯수' },
                        { $inc: { totalPost: 1 } },
                        (err: Error, result: any) => {
                            if (err) {
                                return console.log(err);
                            }
                            res.send('전송완료');
                        }
                    );
                }
            );
        }
    );
});

// delete
app.delete('/delete', (req: Request, res: Response) => {
    // db에서 삭제하기
    req.body._id = parseInt(req.body._id);
    db.collection('post').deleteOne(req.body, (err: Error, result: any) => {
        console.log('삭제완료');
        res.status(200).send({ message: '성공했습니다' });
    });
    res.send('삭제!');
});

// detail
app.get('/detail/:id', (req: Request, res: Response) => {
    db.collection('post').findOne(
        { _id: parseInt(req.params.id) },
        (err: Error, result: any) => {
            res.render('detail.ejs', { data: result });
        }
    );
});

// /edit
app.get('/edit/:id', (req: Request, res: Response, next: NextFunction) => {
    db.collection('post').findOne(
        { _id: parseInt(req.params.id) },
        (err: Error, result: any) => {
            res.render('edit.ejs', { post: result });
            console.log(result);
        }
    );
});
app.put('/edit', (req: Request, res: Response, next: NextFunction) => {
    db.collection('post').updateOne(
        { _id: parseInt(req.body.id) },
        { $set: { 제목: req.body.title, 날짜: req.body.date } },
        (err: Error, result: any) => {
            console.log('수정!');
            // /list로 이동
            res.redirect('/list');
        }
    );
});
