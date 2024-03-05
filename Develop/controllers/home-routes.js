const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [{ 
        model: User,
        attributes: ['username']
      }]
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  
  });


// Route to get a single blog post
router.get("/post/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [{ 
        model: User,
        attributes: ['username']
      },
      { model: Comment,
        attributes: ['text', 'date_added'],
        include: [
          {
            model: User,
            attributes: ['username']
          }
        ]
      }]
    });

    const post = dbPostData.get({ plain: true });
    
    res.render('blogpost', {
      post,
      loggedIn: req.session.loggedIn
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// route for dashboard 
router.get('/dashboard', async (req, res) => {

  if (req.session.loggedIn) {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.userId
      }
    });
  
    const posts = dbPostData.map((post) =>
    post.get({ plain: true })

    );

    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn
    });
    return;
  }
  res.redirect('login');
})

    // Editor route
router.get('/editor/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [{ 
        model: User,
        attributes: ['username']
      },
      { model: Comment,
        attributes: ['text', 'date_added'],
        include: [
          {
            model: User,
            attributes: ['username']
          }
        ]
      }]
    });
    const post = dbPostData.get({ plain: true });

    if (req.session.loggedIn) {
      res.render('editor', {
        post,
        loggedIn: req.session.loggedIn
      });
      return;
    }

    res.render('login');

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//create route
router.get('/create', async (req, res) => {
  if (req.session.loggedIn) {
    res.render('create', {
      loggedIn: req.session.loggedIn
    });
    return;
  }
  res.render('login');
});

// login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});
// Sign-up route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
})

module.exports = router;