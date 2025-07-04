const { body } = require("express-validator");

exports.validateRegister = [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Email không hợp lệ"),
    body("password")
        .notEmpty()
        .withMessage("Password là bắt buộc")
        .isLength({ min: 6 })
        .withMessage("Password phải có ít nhất 6 ký tự"),
    body("role")
        .optional()
        .isIn(["CUSTOMER", "FARMER"])
        .withMessage("Role phải là CUSTOMER hoặc FARMER"),
];
