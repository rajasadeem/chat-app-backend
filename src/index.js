import server from "./app.js";
import envConfig from "./config/env.config.js";
import { dbConnection } from "./database/db.connection.js";

const port = envConfig.port;

dbConnection();

server.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
