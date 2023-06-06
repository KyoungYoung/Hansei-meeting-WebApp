import express from 'express';
import {userInfo, userLogout, userLogin, userSessionCheck, userSignUp, loginUser} from '@/controllers/userController';
const router = express.Router();

router.route('/login')
    .get(loginUser, userSessionCheck)
    .post(userLogin)
    .delete(loginUser,userLogout)

router.route('/mypage')
    .get(loginUser, userInfo)

router.route('/join')
    .post(userSignUp)



export default router;