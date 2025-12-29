const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const existing = await db.find({
      selector: { email: req.body.email }
    });

    if (existing.docs.length > 0) {
      return res.status(409).json({ message: "Data already inserted" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await db.insert({
      ...req.body,
      password: hashedPassword
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await db.find({
      selector: { email: req.body.email }
    });

    if (!result.docs.length) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.docs[0];
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.userId = user._id;

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.userGet = async (req, res) => {
  const user = await db.get(req.session.userId);
  delete user.password;
  res.json(user);
};

exports.userUpdate = async (req, res) => {
  const user = await db.get(req.session.userId);
  const updated = { ...user, ...req.body };
  await db.insert(updated);
  res.json({ message: "User updated successfully" });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logout successful" });
  });
};
