export const validateRegister = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Missing fields" });
    }
    next();
};
