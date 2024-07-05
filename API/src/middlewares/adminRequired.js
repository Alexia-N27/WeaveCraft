export default (req, res, next) => {
  if(!req.session.user || req.session.user.roles_id !== 1) {
    res.status(403).json({ msg: "Vous n'êtes pas autorisé à effectuer cette action" });
    return;
  }
  if(req.session.user.roles_id === 1) {
    next();
  }
};
