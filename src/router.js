import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

/// your routes will go here

// example!
// on routes ending in /someroute/:someID
// ----------------------------------------------------

const handleCreatePost = async (req, res) => {
  try {
    // use req.body etc to await some contoller function
    const result = await Posts.createPost(req.body, req.user);
    // send back the result
    res.json(result);
  } catch (error) {
    // or catch the error and send back an error
    res.status(500).json({ error });
  }
};

const handleGetPosts = async (req, res) => {
  try {
    // use req.body etc to await some contoller function
    const result = await Posts.getPosts();
    // send back the result
    res.json(result);
  } catch (error) {
    // or catch the error and send back an error
    res.status(500).json({ error });
  }
};

const handleGetPost = async (req, res) => {
  try {
    // use req.body etc to await some contoller function
    const result = await Posts.getPost(req.params.id);
    // send back the result
    if (result == null) {
      res.status(404).json({ error: 'could not find by id' });
    } else {
      res.json(result);
    }
  } catch (error) {
    // or catch the error and send back an error
    res.status(404).json({ error });
  }
};

const handleUpdatePost = async (req, res) => {
  try {
    // use req.body etc to await some contoller function
    const result = await Posts.updatePost(req.params.id, req.body);
    // send back the result
    if (result == null) {
      res.status(404).json({ error: 'could not find by id' });
    } else {
      res.json(result);
    }
  } catch (error) {
    // or catch the error and send back an error
    res.status(500).json({ error });
  }
};

const handleDeletePost = async (req, res) => {
  try {
    // use req.body etc to await some contoller function
    const result = await Posts.deletePost(req.params.id);
    // send back the result
    if (result == null) {
      res.status(404).json({ error: 'already deleted this post or could not find by id' });
    } else {
      res.json(result);
    }
  } catch (error) {
    // or catch the error and send back an error
    res.status(500).json({ error });
  }
};

const handleSignIn = async (req, res) => {
  try {
    const token = UserController.signin(req.user);
    res.json({ token, email: req.user.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
};

const handleSignUp = async (req, res) => {
  try {
    const token = await UserController.signup(req.body);
    res.json({ token, email: req.body.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
};

router.route('/posts/')
  .post(requireAuth, handleCreatePost)
  .get(handleGetPosts);

router.route('/posts/:id')
  .get(handleGetPost)
  .put(requireAuth, handleUpdatePost)
  .delete(requireAuth, handleDeletePost);

router.post('/signin', requireSignin, handleSignIn);
router.post('/signup', handleSignUp);

export default router;
