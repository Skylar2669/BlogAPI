import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "7/25/2023",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "7/26/2024",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "7/27/2024",
  },
];

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/posts", (req, res) => {
  res.json(posts);
})

app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // console.log(id);

  const selectedPost = posts.find(post => post.id === id);
    if (!selectedPost) {
      res.status(404).json({ message: "Post not found" })
    }else{
      res.json(selectedPost);
    }
})
app.post("/posts", (req, res) => {
  console.log(req.body);

  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Intl.DateTimeFormat('en-US').format(Date.now()),
  }

  posts.push(newPost);
  res.sendStatus(200);
})
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const existingPost = posts.find(post => post.id);
  const updatePost = {
    id: id,
    author:  req.body.author || existingPost.author,
    content: req.body.content || existingPost.content  ,
    title:  req.body.title || existingPost.title,
    date: existingPost.date,
  }
  console.log(updatePost);
  const idx = posts.findIndex(post => post.id);
  posts[idx] = updatePost;
  res.json(posts);
})
app.delete("/posts/:id", (req,res) => {
  const id = parseInt(req.params.id);

  const searchId = posts.findIndex(post => post.id === id)
  if(searchId > -1){
    posts.splice( searchId , 1);
    res.sendStatus(200);
  }else{
    res.status(404);
    res.json({ error: `Post with id: ${id} not found. No posts were deleted.` });
  }
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
