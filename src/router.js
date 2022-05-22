import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

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

const handleGetProducts = async (req, res) => {
  try {
    const tone = req.query.tone
    const type = req.query.type
    // use req.body etc to await some contoller function
    const result = await Posts.getPosts();
    // send back the result
    res.json(result);
  } catch (error) {
    // or catch the error and send back an error
    res.status(500).json({ error });
  }
};

const handleGetProduct = async (req, res) => {
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

const handleUpdateUser = async (req, res) => {
  try {
    const id = req.params.id
    // use req.body etc to await some contoller function
    const result = await Posts.updatePost(id, req.body);
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

router.route('/products')
  .get(handleGetProducts);

router.route('/products/:id')
  .get(handleGetProduct);

router.post('/user/signin', requireSignin, handleSignIn);
router.post('/user/signup', handleSignUp);
router.patch('/user/:id', handleUpdateUser);

export default router;
