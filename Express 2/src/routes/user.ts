import express,{ Request, Response, NextFunction }  from 'express';
import {userInfo, userLogout, userLogin, userSessionCheck, userSignUp, loginUser} from '@/controllers/userController';
import { db } from '@/app';

const passport = require('passport');   

const router = express.Router();
router.use(passport.session());
router.route('/login')
    .get(loginUser, userSessionCheck)
    .post(userLogin)
    .delete(loginUser,userLogout)

router.route('/mypage')
    .get(loginUser, userInfo)

router.route('/join')
    .post(userSignUp)



export default router;