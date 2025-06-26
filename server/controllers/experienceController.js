exports.addExperience = (req, res) => {
  res.send("Add Experience");
};

exports.getAllExperiences = (req, res) => {
  res.send("All Experiences");
};

exports.getSingleExperience = (req, res) => {
  res.send(`Experience with ID ${req.params.id}`);
};

exports.likeExperience = (req, res) => {
  res.send(`Like toggled for experience ${req.params.id}`);
};

exports.commentOnExperience = (req, res) => {
  res.send(`Comment added for experience ${req.params.id}`);
};

exports.getCommentsForExperience = (req, res) => {
  res.send(`Comments for experience ${req.params.id}`);
};
