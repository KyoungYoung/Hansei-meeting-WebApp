
import express from 'express';
import { postDetail, postEditRequest, postEditView, postList, postSearch, postWrite } from '@/controllers/postController';
const router = express.Router();

router.route('/list')
.get(postList)
router.route('/search')
.get(postSearch)

router.route('/write')
.post(postWrite)

router.route('/edit')
.get(postEditView)
.put(postEditRequest)

router.route('/detail/:id')
.get(postDetail)


export default router;