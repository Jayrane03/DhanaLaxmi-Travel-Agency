import User from "../../models/User.js";


// ================= GET ALL USERS =================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message
    });
  }
};


// ================= DELETE USER =================
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    }

    // ❌ prevent admin from deleting himself
    if (req.user.id === user._id.toString()) {
      return res.status(400).json({
        success: false,
        msg: "You cannot delete your own account"
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      msg: "User deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message
    });
  }
};


// ================= UPDATE ROLE =================
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid role"
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    }

    // ❌ prevent admin from removing his own admin role
    if (req.user.id === user._id.toString()) {
      return res.status(400).json({
        success: false,
        msg: "You cannot change your own role"
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      msg: "Role updated successfully",
      data: user
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message
    });
  }
};