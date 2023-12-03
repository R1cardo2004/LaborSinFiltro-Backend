const Post = require('../models/Post.Model')
const Trends = require('../models/tag.model')
const controller = {};

controller.save = async (req, res, next) => {
    try{
        const {titulo, texto, tags, comentarios, grupo, tagscontent} = req.body
        const {identifier} = req.params
        const { user } = req;

        let post = await Post.findById(identifier)
        const [tag1, tag2, tag3] = tagscontent

        if(!post){
            post = new Post({
                titulo: titulo,
                texto: texto,
                tags: tags,
                comentarios: comentarios,
                autor: user,
                grupo: grupo,
                tags: {content: tagscontent}
                
            })
        }

        const trend1 = new Trends({
            tag:tag1
        })
        const trend1save = await trend1.save()

        const trend2 = new Trends({
            tag:tag2
        })
        const trend2save = await trend2.save()

        const trend3 = new Trends({
            tag:tag3
        })
        const trend3save = await trend3.save()

        const postsave = await post.save()
        if(!postsave){
            console.log("conflicto");
            return res.status(401).json({ error: "error creating  post"})
        }

        if(!trend3save){
            console.log("conflicto");
            return res.status(401).json({ error: "error creating  post"})
        }
        if(!trend2save){
            console.log("conflicto");
            return res.status(401).json({ error: "error creating  post"})
        }
        if(!trend1save){
            console.log("conflicto");
            return res.status(401).json({ error: "error creating  post"})
        }

        return res.status(201).json(postsave)
    }catch(err){
        console.error(err);
        return res.status(500).json({ error: "internal service error"});
    }
}

controller.findall = async (req, res, next) => {
    try {
        const post = await Post.find({}).populate("autor", "username email").populate("likes", "username email")
        return res.status(200).json({ post })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal service error"});
    }
}

controller.findById = async (req, res, next) => {
    try {
        const { identifier } = req.params
        
        const post = await Post.findById(identifier).populate("autor", "username email").populate("likes", "username email")
        if(!post){
            return res.status(404).json({ error: "post not found" })
        }
        return res.status(200).json({ post })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "internal service error"});
    }

}

controller.deletebyID = async (req, res, next) => {
    try {
        const { identifier } = req.params
        const post = await Post.findByIdAndDelete(identifier)

        if(!post){
            return res.status(404).json({ error: "post no encontrado" })
        }

        return res.status(200).json({ message: "post borrado" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "internal service error"});
    }
}

controller.findallReverse = async (req, res, next) => {
    try {
        const post = await Post.find({grupo: null}).sort({_id: -1}).populate("autor", "username email").populate("likes", "username email").populate("comments.user", "username email")
        return res.status(200).json({ post })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal service error"});
    }
}

controller.findallReverseByUser = async (req, res, next) => {
    try {
        const {user} = req;
        const post = await Post.find({autor: user}).sort({createdAt: -1}).populate("autor", "username email").populate("likes", "username email").populate("comments.user", "username email")
        return res.status(200).json({ post })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal service error"});
    }
}

controller.findallReverseByGroup = async (req, res, next) => {
    try {
        const {grupo} = req.params
        const post = await Post.find({grupo: grupo}).sort({createdAt: -1}).populate("autor", "username email").populate("likes", "username email").populate("comments.user", "username email")
        return res.status(200).json({ post })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal service error"});
    }
}

controller.LikePost = async (req, res, next) => {
    try {
        const {identifier} = req.params
        const {user} = req;

        const post = await Post.findById(identifier)
        if(!post){
            return res.status(404).json({ error: "post not found" })
        }

        let _likes = post["likes"] || [];
        const alreadyLike = _likes.findIndex(_i => _i.equals(user)) >= 0;

        if(alreadyLike){
            _likes = _likes.filter(_i => !_i.equals(user))
        } else{
            _likes = [user, ..._likes]
        }

        post["likes"] = _likes
        const postsave = post.save()

        if(!postsave){
            return res.status(401).json({ error: "error creating  post"})
        }


    } catch (error) {
        console.error(err);
        return res.status(500).json({ error: "internal service error"});
    }
}

controller.findbylike = async (req, res, next) => {
    try {
        const { user } = req
        
        const post = await Post.find({likes:{$in:[user]}})
        .populate("autor", "username email").populate("likes", "username email")
        if(!post){
            return res.status(404).json({ error: "post not found" })
        }
        return res.status(200).json({ post })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "internal service error"});
    }
}

controller.addcomment = async (req,res,next) => {
    try {
        const {identifier} = req.params
        const {content} = req.body
        const {user} = req

        const post = await Post.findById(identifier).populate("autor", "username email").populate("likes", "username email").populate("comments.user", "username email")
        if(!post){
            return res.status(404).json({ error: "post not found" })
        }
        
        let _comments = post["comments"]
        _comments = [..._comments, {user: user, timestamp: new Date(), content: content}]
        post["comments"] = _comments

        const postsave = await post.save()
        if(!postsave){
            console.log("conflicto");
            return res.status(401).json({ error: "error creating  post"})
        }

        return res.status(201).json(postsave)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "internal service error"});
    }
}

module.exports= controller