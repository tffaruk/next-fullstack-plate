import { User_Info } from "@/types/user.type";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema<User_Info>({
  email: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
});

const Admin = models.Admin || model<User_Info>("Admin", userSchema);
export default Admin;
