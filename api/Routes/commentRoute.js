import express from 'express';
import { createComment, deleteComment, editComment, getcomments, getPostComments, likeComment } from "../Controllers/commentController.js";
import { verifyToken } from "../Utils/verifyUser.js";


const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getcomments);

export default router;