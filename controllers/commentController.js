const createComment = async (req, res) => {
  res.send("Create Comment");
};

const getAllComments = async (req, res) => {
  res.send("Get All Comments");
};

const getSingleComment = async (req, res) => {
  res.send("Get Single Comment");
};

const updateComment = async (req, res) => {
  res.send("Update Post");
};

const deleteComment = async (req, res) => {
  res.send("Delete Post");
};

module.exports = {
  createComment,
  getAllComments,
  getSingleComment,
  updateComment,
  deleteComment,
};
