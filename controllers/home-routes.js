const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const { with_auth } = require('../utils/helpers');

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

    res.render('homepage', { posts, logged_in: req.session.logged_in });
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
      include: [
        { model: User },
        { model: Comment, include: [{ model: User }] },
      ],
    });

    if (!postData) {
      res.status(400).json({
        message: 'Unable to find a post with that id.',
        data: postData,
      });
      return;
    }

    const post = postData.get({ plain: true });
    console.log('❌', post);
    res.render('post', {
      post,
      logged_in: req.session.logged_in,
      is_author: post.user_id === req.session.user_id,
    });
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
  res.render('new_post', { logged_in: req.session.logged_in });
});

// Render login/signup page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Render User dashboard
router.get('/dashboard', with_auth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      posts: posts,
    });
  } catch (err) {
    console.error({
      message: "There was a problem getting user's posts.",
      error: err,
    });
  }
});

router.get('/update-post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    const post = postData.get({ plain: true });
    res.render('update_post', { post, logged_in: req.session.logged_in });
  } catch (err) {
    console.error({
      message: 'There was an error getting the post.',
      error: err,
    });
    res
      .status(500)
      .json({ message: 'There was an error getting the post.', error: err });
  }
});

module.exports = router;
