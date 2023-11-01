const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync("private.key", { encoding: "utf8" });

async function getToken(data) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data },
      privateKey,
      { algorithm: "HS256", expiresIn: "1m" },

      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      },
    );
  });
}

exports.getToken = getToken;
exports.privateKey = privateKey;
