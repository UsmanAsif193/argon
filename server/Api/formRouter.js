const Form = require('../Database/model/formModel');

exports.saveFormData = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingForm = await Form.findOne({ email });

    if (existingForm) {
      return res.send({ success: false, message: 'Email already exists' });
    }

    const newForm = new Form({ name, email, password });
    await newForm.save();
    // const user = await Form.findOne({ email })
    res.send({ success: true, message: 'Account Created. Move to Login.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
