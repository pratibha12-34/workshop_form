import mongoose from "mongoose";

const RegisterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
});

const Register = mongoose.models.Register || mongoose.model("Register", RegisterSchema);

export default Register;
