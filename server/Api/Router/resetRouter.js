
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserForgot = require('../../Database/model/forgotModel')
const Form = require('../../Database/model/formModel')
router.post('/', async function (req, res) {
  const newPassword = req.body.password;
  const token = req.body.token

  try {
    const user = await UserForgot.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (user) {
      const hash = await bcrypt.hash(newPassword, 10); // Using 10 rounds of salt

      await Form.findOneAndUpdate(
        { email: user.email },
        { password: hash }, // Update the password field with the hashed password
        { new: true } // Return the updated document
      );

      res.send({ success: true, message: 'Password Successfully Updated. Move to Login' });
    } else {
      res.send({ success: false, message: 'User not found or token expired' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;