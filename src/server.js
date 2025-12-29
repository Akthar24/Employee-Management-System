process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = require("./app");
const env = require("./config/env");

app.listen(env.PORT, () => {
  console.log("✅ Server is running successfully!");
  console.log(`Server running on http://localhost:${env.PORT}`);
});
