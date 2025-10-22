const bcrypt = require("bcrypt");
(async () => {
  const pwd = process.argv[2] || "admin123";
  const hash = await bcrypt.hash(pwd, 10);
  console.log("password", pwd);
  console.log("hash", hash);
})();
