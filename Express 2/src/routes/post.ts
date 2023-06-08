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
let passport: any = require('passport');
const router = express.Router();
router.use(passport.session());
router.route('/list').get(postList);
router.route('/search').get(postSearch);

router.route('/write').post(postWrite);

router.route('/edit').get(postEditView).put(postEditRequest);

router.route('/detail/:id').get(postDetail);

router.route('/delete').delete(postDelete);

export default router;
