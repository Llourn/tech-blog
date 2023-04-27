const router = require('express').Router();
const { Post } = require('../../models');

// Create new post
router.post('/', async (req, res) => {
  try {
    const postData = Post.create({
      title: req.body.title,
      image: req.body.image,
      body: req.body.body,
      user_id: req.session.user_id,
    });

    res.json(postData);
  } catch (err) {
    console.error({
      message: 'There was a problem creating the post.',
      error: err,
    });
    res.status(500).json({
      message: 'There was a problem creating the post.',
      error: err,
    });
  }
});

// Get post by id

// Update post by id

// Delete post

module.exports = router;
