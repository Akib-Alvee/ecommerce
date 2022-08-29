import jwt from 'jsonwebtoken';

//we take a  secret key which is recognized by token
const secret = 'test';

const auth = async (req, res, next) => {
  const token = req.cookies.token || '';

  try {
    if (!token) {
      return res.status(401).json(' login first');
    }
    const decodedData = jwt.verify(token, 'KEY');

    req.user = {
      usernae: decodedData.username,
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.toString());
  }
};
export default auth;
