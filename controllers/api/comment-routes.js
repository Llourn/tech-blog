const router = require('express').Router();
const { Comment } = require('../../models');

// Create new comment
router.post('/', async (req, res) => {
  try {
    const commentData = Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    res.json(commentData);
  } catch (err) {
    console.error({
      message: 'There was a problem creating the comment.',
      error: err,
    });
    res.status(500).json({
      message: 'There was a problem creating the comment.',
      error: err,
    });
  }
});

module.exports = router;
