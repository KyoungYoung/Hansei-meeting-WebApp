import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import 'tsconfig-paths/register';
import userRouter from './routes/user';
import postRouter from './routes/post'
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app: Application = express();
const swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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


let connectDB: any;
MongoClient.connect(
    process.env.DB_URL,
    { useUnifiedTopology: true },
    (err: Error, client: any) => {
        // 에러날 시
        if (err) return console.log(err);
        
        // hansei db에 연결하기
            connectDB = client.db('hansei');

        
    }
)
export const db = connectDB
app.set('db', db)

app.use('/user', userRouter)
app.use('/post', postRouter)
// 서버 실행
app.listen(process.env.PORT, () => {
    console.log(`🛡️  Server listening on port: 8000🛡️`);
});

// 메인 페이지
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('index.ejs');
});

// 회원 인증
export const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
export const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

const fileStoreOptions = {
    ttl: 7200,
};
// 회원 인증 미들웨어: 요청, 응답 사이에 실행되는 코드
app.use(
    cors({
        origin: ['localhost:3000', '13.209.218.58', '13.209.218.58:3002'],
        credentials: true,
    })
);
app.use(
    session({
        store: new FileStore(fileStoreOptions),
        secret: '비밀코드',
        resave: true,
        saveUninitialized: false,
        name: 'sid',
    })
);
app.use(passport.initialize());
app.use(passport.session());

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

// 로그인 실패하면 /fail로 리다이렉트

// app.post('/user/login', (req, res) => {
//     const { id, pw } = req.body; // 요청에서 아이디와 비밀번호 추출
//     console.log(id, pw, '요청받음');
//     // 아이디와 비밀번호 검증 로직
//     if (id === 'kky' && pw === '1234') {
//         // 인증 성공
//         res.status(200).json({ message: '로그인 성공' });
//     } else {
//         // 인증 실패
//         res.status(401).json({ message: '로그인 실패' });
//     }
// });

app.get(
    '/user/fail',
    (req: Request | any, res: Response, next: NextFunction) => {
        const errorMessage = req.flash('error')[0];
        res.json({ errorMessage });
        // <script>
        //     alert("${errorMessage}");
        //     window.location.href = "/user/login";
        // </script>
    }
);


// /search - 검색 페이지


// /write 글 작성 페이지
app.get('/post/write', (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.origin=='localhost:8000')res.render('write.ejs');
});

// /write - form 데이터 /write-page로 POST 요청


// /list GET 요청 처리

// getAuthorName 함수 정의


// /delete


// /edit - 수정페이지


// /detail - 상세 글 페이지

