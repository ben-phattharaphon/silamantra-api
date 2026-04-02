import { loginService, registerService } from "../services/auth.service.js";
import { updateProfileService } from "../services/user.service.js";

//register
export async function registerController(req, res, next) {
  try {
    const { email, username, password, birth_date, confirmPassword } = req.body;

    const result = await registerService({
      email,
      username,
      password,
      birth_date,
      confirmPassword,
    });
    res.json({
      message: "Register Successful",
      result,
    });
  } catch (err) {
    next(err); // ส่งไป error middleware
  }
}

//login
export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await loginService({ email, password });
    res.json({
      success: true,
      message: "Login successful",
      token: result.token,
      user: result.user,
      role: result.user.role,
    });
  } catch (err) {
    next(err); // ส่งไป error middleware
  }
}

//getMe
export function getMeController(req, res, next) {
  res.json({ user: req.user });
}

//Update Profile
export const updateProfileController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const updatedUser = await updateProfileService(userId, req.body);

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
