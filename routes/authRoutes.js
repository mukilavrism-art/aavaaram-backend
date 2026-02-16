// TEMP – RUN ONLY ONCE
router.post("/register-admin", async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ msg: "Admin already exists" });
  }

  const admin = await User.create({
    email,
    password,
    role: "admin",
  });

  res.json({ msg: "Admin created", admin });
});
