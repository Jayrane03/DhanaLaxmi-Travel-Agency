import Package from "../../models/Packages.js";

// ---------------- CREATE ----------------
export const createPackage = async (
  req,
  res
) => {
  try {

    const pkg = await Package.create({
      ...req.body,

      pricePerPerson: Number(
        req.body.pricePerPerson
      ),

      duration: {
        days: Number(
          req.body.duration?.days
        ),

        nights: Number(
          req.body.duration?.nights
        ),
      },
    });

    res.status(201).json({
      success: true,
      data: pkg,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ---------------- GET ALL ----------------
export const getPackages = async (req, res) => {
  try {
    const data = await Package.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });

  } catch (err) {
    console.error("GET PACKAGES ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ---------------- GET SINGLE ----------------
export const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.status(200).json({
      success: true,
      data: pkg,
    });

  } catch (err) {
    console.error("GET PACKAGE ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ---------------- UPDATE ----------------
export const updatePackage = async (
  req,
  res
) => {
  try {

    const updated =
      await Package.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,

          pricePerPerson: Number(
            req.body.pricePerPerson
          ),

          duration: {
            days: Number(
              req.body.duration?.days
            ),

            nights: Number(
              req.body.duration?.nights
            ),
          },
        },

        {
          new: true,
          runValidators: true,
        }
      );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updated,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ---------------- DELETE ----------------
export const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Package deleted successfully",
    });

  } catch (err) {
    console.error("DELETE PACKAGE ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};