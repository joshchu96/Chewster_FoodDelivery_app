import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized, Please Login Again",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized, Please Login Again",
    });
  }

  try {
    const decode_token = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decode_token.id };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error",
    });
  }
};

export default authMiddleware;
