const jwt = require("jsonwebtoken");

const token = jwt.sign({ test: true }, "my-secret-key");

//jwt.io
console.log(token);

const decoded = jwt.verify(token, "my-secret-key123");
console.log(decoded);
