import Post from '../models/post_model';

export async function createPost(postFields) {
  try {
    const newPost = new Post();
    newPost.title = postFields.title;
    newPost.tags = postFields.tags;
    newPost.content = postFields.content;
    newPost.coverUrl = postFields.coverUrl;
    const savedpost = await newPost.save();
    return savedpost;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
}

export async function getPosts() {
  try {
    const posts = await Post.find();
    return posts;
  } catch (error) {
    throw new Error(`get posts error: ${error}`);
  }
}

export async function getPost(id) {
  try {
    const post = await Post.findById(id);
    return post;
  } catch (error) {
    throw new Error(`get post error: ${error}`);
  }
}

export async function deletePost(id) {
  try {
    const result = await Post.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw new Error(`delete post error: ${error}`);
  }
}

export async function updatePost(id, postFields) {
  try {
    const foundPost = await Post.findByIdAndUpdate(id, postFields);
    if (foundPost == null) {
      return foundPost;
    } else {
      return await getPost(id);
    }
  } catch (error) {
    throw new Error(`update post error: ${error}`);
  }
}
