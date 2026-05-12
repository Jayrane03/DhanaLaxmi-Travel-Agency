import Query from "../../models/Query.js";

// CREATE QUERY (User)
export const createQuery = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const query = await Query.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      data: query
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET ALL QUERIES (Admin)
export const getQueries = async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: queries
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// UPDATE STATUS (Admin)
export const updateQueryStatus = async (req, res) => {
  try {
    const query = await Query.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json({
      success: true,
      data: query
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// DELETE QUERY
export const deleteQuery = async (req, res) => {
  try {
    await Query.findByIdAndDelete(req.params.id);

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getQueriesGrouped = async (req, res) => {
  try {
    const grouped = await Query.aggregate([
      {
        $group: {
          _id: "$email",
          name: { $first: "$name" },
          queries: {
            $push: {
              _id: "$_id",
              subject: "$subject",
              message: "$message",
              status: "$status",
              createdAt: "$createdAt"
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({ success: true, data: grouped });
  } catch (err) {
    console.error("GROUPED QUERY ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};
// controllers/query.js
export const getUserQueries = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const queries = await Query.find({ email })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: queries
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};