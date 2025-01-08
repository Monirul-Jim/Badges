import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expired_in: process.env.JWT_ACCESS_EXPIRED_IN,
  jwt_refresh_expired_in: process.env.JWT_REFRESH_EXPIRED_IN,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  user_email: process.env.USER_EMAIL,
  user_password: process.env.USER_PASSWORD,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
};
