import dotenv from "dotenv";
dotenv.config();

const envConfig = {
  port: process.env.PORT || 3022,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || "MySecretForJWT",
};

export default envConfig;
