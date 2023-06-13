import express from 'express';
import {
    postDelete,
    postDetail,
    postEditRequest,
    postEditView,
    postList,
    postSearch,
    postWrite,
} from '@/controllers/postController';
import { loginUser } from '@/controllers/userController';
let passport: any = require('passport');
const router = express.Router();
router.use(passport.session());

router.route('/search').get(postSearch);

router.route('')
.get(postList)
.post(loginUser, postWrite)
.put((req,res)=>{res.status(405).end()})
.delete((req,res)=>{res.status(405).end()})

router.route('/:id')
.get(postDetail)
.post((req,res)=>{res.status(405).end()})
.put(loginUser, postEditRequest)
.delete(loginUser,postDelete)

//백엔드만 유효
router.route('/edit').get(postEditView);




export default router;
