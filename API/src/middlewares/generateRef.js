function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghyjklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for(let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default (req, res, next) => {
  const ref = generateRandomString(15);
  req.body.ref = ref;
  next();
};
