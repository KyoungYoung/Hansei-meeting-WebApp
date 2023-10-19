
const passport = require('passport');
import { db } from '@/app';
const local = require('./localStrategy');

module.exports = () => {
    // 세션 만들기
// id 이용해 세션 저장 코드 - 로그인 성공시 발동, 아이디, 비번 검증 성공시 result값이 성공할 시 user로 보냄
passport.serializeUser((user: any, done: any) => {
    console.log("세션생성")
    // 세션 데이터를 만들고 id정보를 쿠키로 보냄
    done(null, user.id);
});
// 세션 데이터를 가진 사람을 db에서 찾는 코드 - 마이 페이지 접속시
passport.deserializeUser((id: any, done: any) => {
    console.log('인증처리')
    db.collection('login').findOne({ id: id }, (err: Error, result: any) => {
        done(null, result);
    });
});
    local()
}