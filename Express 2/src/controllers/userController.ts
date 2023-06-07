
import { db} from '@/app';
import { Request, Response, NextFunction } from 'express';
const passport = require('passport')


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
    
    if (req.headers.host == 'localhost:8000'&&req.headers.origin== 'localhost:8000') {
        res.render('mypage.ejs', { userMe: req.user });
    }else{
        console.log('로그인된 유저');
        res.header('Content-Type', 'application/json');
        res.status(200).json({ succeed: true, user: req.user  });

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
            res.redirect('/user/login');
        }
        res.render('login.ejs');
    }else{
        console.log('인증성공');
    res.status(200).json({ succeed: true, message: '로그인된 유저입니다' });
    }
    
}

export const userLogin= (req: Request|any, res: Response, next: NextFunction) => {
    // #swagger.tags = ['user']
    passport.authenticate('local',(err: Error, user: any, info: any) => {
        console.log(req)
        const { id, pw, studentId, department } = req.body; // 요청에서 아이디와 비밀번호 추출
        console.log(id, pw, studentId, department, '요청받음');

        if (err) {
          return next(err);
        }
        if (!user) {
          // 인증 실패 처리
          return res.status(401).json({ message: '인증 실패' });
        }
        // 인증 성공 처리
        req.login(user, (err: Error) => {
          if (err) {
            console.log('로그인 오류');
            return next(err);
            
          }
          res.status(200).json({ id: id, message: '정상로그인' });
            console.log('로그인성공');
        });
      })(req, res, next);
    }
// (req: Request | any, res: Response, next: NextFunction) => {
//     console.log(req)
//     const { id, pw, studentId, department } = req.body; // 요청에서 아이디와 비밀번호 추출
//     console.log(id, pw, studentId, department, '요청받음');

//     req.login(req.user, (err: Error) => {
//         if (err) {
//             return next(err);
//         }
//     });
//     console.log('요청출력', id, pw, studentId, department);
//     req.login(req.user, (err: Error) => {
//         if (err) {
//             // res.setHeader('Content-Type', 'application/json');
//             // res.status(401).json({ data: '로그인실패' });
//             return next(err);
//         }
//     });
//     try {
//         res.header('Access-Control-Allow-Credentials', 'true');
//         res.status(200).json({ id: id, message: '정상로그인' });
//         console.log('로그인성공');
//     } catch (error) {
//         console.log('로그인 오류');
//     }
//     }
// }


export function loginUser(req: Request | any, res: Response, next: any) {
    console.log('접근')
    console.log(req.user)
    if (req.user) {
        console.log('통과')
        // 요청 user 있으면 통과
        next();
    } else {
        console.log('실패')
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
    if (req.headers.host === 'localhost:8000') {
        res.redirect('/login');
    }else{
     res.status(200).json({succeed:true,user:{id:req.body.id}, message:`${req.body.id} 회원가입 성공`})

    }
};
