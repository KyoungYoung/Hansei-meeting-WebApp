import { db } from '@/app';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


module.exports = ()=>{
    passport.use(new LocalStrategy(
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
                console.log('로그인요청')
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
}