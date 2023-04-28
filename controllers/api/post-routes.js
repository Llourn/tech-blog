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

// Update post by id
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.json(postData);
  } catch (err) {
    console.error({
      message: 'There was a problem updating the post.',
      error: err,
    });
    res
      .status(500)
      .json({ message: 'There was a problem updating the post.', error: err });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json(postData);
  } catch (err) {
    console.error({
      message: 'There was a problem deleting the post.',
      error: err,
    });
    res
      .status(500)
      .json({ message: 'There was a problem deleting the post.', error: err });
  }
});

module.exports = router;
