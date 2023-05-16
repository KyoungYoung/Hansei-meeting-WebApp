import express, { Request, Response, NextFunction } from 'express';

const app = express();
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

// /list
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

// /write 작성 페이지
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
                            res.redirect('/list');
                        }
                    );
                }
            );
        }
    );
});

// /delete
app.delete('/delete', (req: Request, res: Response) => {
    // db에서 삭제하기
    req.body._id = parseInt(req.body._id);
    db.collection('post').deleteOne(req.body, (err: Error, result: any) => {
        console.log('삭제완료');
        res.status(200).send({ message: '성공했습니다' });
    });
});

// /detail
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

// /login - 로그인
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
    (req: Request, res: Response, next: NextFunction) => {
        res.redirect('/mypage');
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
                    if (inputPW == result.pw) {
                        return done(null, result);
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

// /mypage
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

// /join - 회원가입
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
