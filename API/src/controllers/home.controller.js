const getHomePage = async (req, res) => {
  res.json({ msg: "Bienvenue sur la page d'accueil !" });
};

export { getHomePage };
