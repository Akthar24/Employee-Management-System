const nano = require("nano");
const env = require("./env");

const couch = nano({
  url: env.COUCHDB_URL,
  requestDefaults: {
    timeout: 10000
  }
});

module.exports = couch.db.use(env.COUCHDB_DB);
