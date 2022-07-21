const createPost = (req, res) => {
  res.send("Create Post");
};

const getSinglePost = (req, res) => {
  res.send("Get Single Post");
};

const getAllPosts = (req, res) => {
  res.send("Get All Posts");
};

const updatePost = (req, res) => {
  res.send("Update Post");
};

const deletePost = (req, res) => {
  res.send("Delete Post");
};

const uploadImage = (req, res) => {
  res.send("Upload Image");
};

module.exports = {
  createPost,
  getSinglePost,
  getAllPosts,
  updatePost,
  deletePost,
  uploadImage,
};
