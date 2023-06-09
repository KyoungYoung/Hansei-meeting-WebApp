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

router.route('/')
.get(postList)
.post(loginUser, postWrite)
.delete(postDelete)

router.route('/:id')
.get(postDetail)
.put(loginUser, postEditRequest)

router.route('/edit').get(postEditView);




export default router;
