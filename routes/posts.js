import express from 'express';
import post from '../controllers/posts.js';

const postRouter = express.Router();

// CRUD
// CREATE - READ - UPDATE - DELETE

// READ ALL
postRouter.get('/', post.getPosts);
// CREATE
postRouter.post('/', post.createPost);
// READ ONE
postRouter.get('/:id', post.getPost);
// Find posts of a user
postRouter.get('/:id', post.getPostsByTeacherId)
// UPDATE
postRouter.put('/:id', post.editPost);
//DELETE
postRouter.delete('/:id', post.deletePost);

export default postRouter;
