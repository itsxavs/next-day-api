import Post from "../models/post.js"

const post = {}
post.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(post);
    } catch (error){
        res.status(404).json({ message: error.message})
    }
}
post.getPostsByTeacherId = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find().where('teacherId').gte(userId);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

post.createPost = async (req, res) => {
    const post = req.body;
    const newPost = new Post(post)
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
post.getPost = async (req, res ) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id)
        res.status(200).json(post)
    }catch (error){
        res.status(409).json({ message: error.message})
    }

}
post.editPost =  async (req, res ) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndUpdate(id, {$set: req.body}, {new:true})
        res.status(200).json(post)
    }catch (error){
        res.status(409).json({ message: error.message})
    }

}

post.deletePost =  async (req, res ) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id)
        res.status(200).json(post)
    }catch (error){
        res.status(409).json({ message: error.message})
    }

}
export default post