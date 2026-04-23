import Package from "../../models/Packages.js";

// CREATE
export const createPackage = async (req, res) => {
  try {
    const pkg = await Package.create(req.body);
    res.status(201).json(pkg);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET ALL (for admin + user)
export const getPackages = async (req, res) => {
  const data = await Package.find().sort({ createdAt: -1 });
  res.json(data);
};