export default (req, res, next) => {
  if(req.session.user) {
    res.json({ message: "Utilisateur connecté", user: req.session.user });
    next();
  } else {
    res.status(401).json({ message: "Utilisateur non connecté" });
  }
};
