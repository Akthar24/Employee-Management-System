const { z } = require("zod");
require("dotenv").config();

const envSchema = z.object({
  PORT: z.string(),
  COUCHDB_URL: z.string(),
  COUCHDB_DB: z.string(),
  SESSION_SECRET: z.string()
});

module.exports = envSchema.parse(process.env);
