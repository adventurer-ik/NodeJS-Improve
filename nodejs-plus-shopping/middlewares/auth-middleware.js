const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(" ");

  if (tokenType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }

  try {
    const { userId } = jwt.verify(tokenValue, "ddobab");
    const user = User.findById(userId)
      .exec()
      .then((user) => {
        res.locals.user = user;
        next();
      });
    if (!user) {
      res.status(401).send({
        errorMessage: "해당 유저가 없습니다.",
      });
      return;
    }
  } catch (error) {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }
};
