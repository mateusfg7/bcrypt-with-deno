import { DataTypes, Model } from "https://deno.land/x/denodb/mod.ts";

class User extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
  };
}

export default User;
