import jwt from 'jwt-simple';
import User from '../models/user_model';

export const signin = (user) => {
  const token = tokenForUser(user);
  return token;
};

// note the lovely destructuring here indicating that we are passing in an object with these 3 keys
export const signup = async ({ email, password, username }) => {
  if (!email || !password) {
    throw new Error('You must provide email and password');
  }

  // See if a user with the given email exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // If a user with email does exist, return an error
    throw new Error('Email is in use');
  }

  const newUser = new User();
  newUser.email = email.toLowerCase();
  newUser.password = password;
  newUser.username = username;
  await newUser.save();

  return tokenForUser(newUser);
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
