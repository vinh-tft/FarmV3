import * as authService from "../Services/Auth.Service.js";

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

async function login(req, res) {
  try {
    console.log("Yêu cầu login:", req.body); 
    const { user, token } = await authService.login(req.body);
    res.json({ data: { user, token } });
  } catch (err) {
    console.error("Lỗi login:", err); 
    res.status(err.status || 500).json({ message: err.message });
  }
}


//Controller cho quên mật khẩu
async function forgotPassword(req, res) {
  try {
    await authService.forgotPassword(req.body.email, req.get('origin'));
    res.json({ message: 'Gửi email thành công' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// //Controller cho reset mật khẩu
// async function resetPassword(req, res) {
//   try {
//     await authService.resetPassword(req.body.token, req.body.password);
//     res.json({ message: 'Đặt lại mật khẩu thành công' });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// }

// module.exports = { login, forgotPassword, resetPassword };