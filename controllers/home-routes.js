const router = require('express').Router();
const { Post, User } = require('../models');

// Render home page
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
    });

    if (!postData) {
      res.status(400).json({ message: 'Unable to locate any posts.' });
      return;
    }

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error({ message: 'GET /', error: err });
    res
      .status(500)
      .json({ message: 'There was a problem retrieving posts.', error: err });
  }
});

// Render blog post
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    if (!postData) {
      res.status(400).json({
        message: 'Unable to find a post with that id.',
        data: postData,
      });
      return;
    }

    const post = postData.get({ plain: true });
    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error({
      message: 'There was a problem retrieving the post.',
      error: err,
    });
    res.status(500).json({
      message: 'There was a problem retrieving the post.',
      error: err,
    });
  }
});

// New Post
router.get('/new-post', async (req, res) => {
  res.render('newPost');
});

// Render login/signup page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Render User Profile

module.exports = router;
