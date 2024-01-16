const postLogin = (req, res) => {
  res.send('login route');
};

const postRegister = (req, res) => {
  res.send('register route');
};

export default { postLogin, postRegister };
