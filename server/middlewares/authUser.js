import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    // header se token lena
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized, No Token" });
    }

    // token verify karna env secret se
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // req.user me dalna
    req.user = decoded;
    // console.log("token and decoded: ",token,"--",decoded)

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ success: false, message: "Invalid or Expired Token" });
  }
};

export default authUser;
