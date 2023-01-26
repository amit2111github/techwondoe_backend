const crypto = require("crypto");
const { secret } = require("../config/vars");
// console.log(secret);
exports.get_encrypted_password = (plainPassword) => {
  try {
    const ans = crypto
      .createHmac("sha256", secret)
      .update(plainPassword)
      .digest("hex");
    return ans;
  } catch (err) {
    return "";
  }
};
// console.log(get_encrypted_password("Hello"));
// exports.get_encrypted_password = get_encrypted_password;

// console.log(get_encrypted_password('Amit'));
