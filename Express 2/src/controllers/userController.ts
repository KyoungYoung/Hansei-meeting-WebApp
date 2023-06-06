
import { Request, Response, NextFunction } from 'express';
import { db, passport } from '../app';


export const userLogout = (req: Request | any, res: Response, next: NextFunction) => {
    // #swagger.tags = ['user']
    req.session.destroy((err: any) => {
        if (err) {
            // 세션 삭제 실패
            console.log(err);
        }
        // 세션 삭제 성공
        console.log('세션 삭제 완료');
        res.status(204).end();
    });
}

export const userInfo=(req: Request | any, res: Response, next: NextFunction) => {
    // #swagger.tags = ['user']
    console.log('로그인된 유저');
    res.header('Content-Type', 'application/json');
    res.status(200).json({ succeed: true, user: { id: req.user } });

    if (req.headers.origin == 'localhost:8000') {
        res.render('mypage.ejs', { userMe: req.user });
    }
}

export const userSessionCheck= (req: Request | any, res: Response, next: NextFunction) => {
    // #swagger.tags = ['user']
    if (req.headers.origin === 'localhost:8000') {
        var user = req.session.user;
        // 세션 데이터 활용
        if (user) {
            // 로그인된 사용자에 대한 프로필 페이지 보여주기
            res.render('mypage.ejs', { user });
        } else {
            // 로그인되지 않은 사용자는 로그인 페이지로 리다이렉트
            // res.redirect('/user/login');
        }
        res.render('login.ejs');
    }
    console.log('인증성공');
    res.status(200).json({ succeed: true, message: '로그인된 유저입니다' });
}

export const userLogin= (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['user']
    passport.authenticate('local'),
(req: Request | any, res: Response, next: NextFunction) => {
    const { id, pw, studentId, department } = req.body; // 요청에서 아이디와 비밀번호 추출
    console.log(id, pw, studentId, department, '요청받음');

    req.login(req.user, (err: Error) => {
        if (err) {
            return next(err);
        }
    });
    console.log('요청출력', id, pw, studentId, department);
    req.login(req.user, (err: Error) => {
        if (err) {
            // res.setHeader('Content-Type', 'application/json');
            // res.status(401).json({ data: '로그인실패' });
            return next(err);
        }
    });
    try {
        res.header('Access-Control-Allow-Credentials', 'true');
        res.status(200).json({ id: id, message: '정상로그인' });
        console.log('로그인성공');
    } catch (error) {
        console.log('로그인 오류');
    }
    }
}


export function loginUser(req: Request | any, res: Response, next: any) {
    if (req.user) {
        // 요청 user 있으면 통과
        next();
    } else {
        res.status(401).json({ succeed: false, message: '로그인 안함!' });
    }
}

export const userSignUp=(req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['user']
    // login 컬렉션에 회원가입 정보 저장하기
    db.collection('login').insertOne(
        {
            id: req.body.id,
            pw: req.body.pw,
            studentId: req.body.studentId,
            department: req.body.department,
        },
        (err: Error, result: any) => {
            if(err)
            {
                res.status(400).json({succeed:false, error:"회원가입 실패"})
            }
            console.log('저장완료!!!');
        }
    );
    if (req.headers.origin === 'localhost:8000') {
        res.redirect('/login');
    }else{
     res.status(200).json({succeed:true,user:{id:req.body.id}, message:`${req.body.id} 회원가입 성공`})

    }
};
