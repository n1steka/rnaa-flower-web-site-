import Cover from "../../models/cover-model";

export async function handleGetRequest(req, res) {
  try {
    const data = await Cover.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in GET handler:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

export async function handleGetDetailRequest(req, res) {
  try {
    const { id } = req.query;
    console.log(id);
    const data = await Cover.findById(id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in GET handler:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
export async function handleGetRequestDetail(req, res) {
  try {
    const data = await Cover.findById(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in GET handler:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

export async function handlePostRequest(req, res) {
  try {
    const input = {
      ...req.body,
      image: req.file ? req.file.filename : "no photo",
    };
    const data = await Cover.create(input);

    res.status(201).json({
      success: true,
      msg: "Post created asdasd",
      data,
    });
  } catch (error) {
    console.error("Error in POST handler:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

export async function handleDeleteRequest(req, res) {
  try {
    const { id } = req.query;
    const data = await Cover.findByIdAndDelete(id, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      msg: "Post deleted successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error in DELETE handler:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        msg: "Missing or invalid ID",
      });
    }

    console.log(req.file.filename);
    const input = {
      ...req.body,
      image: req.file?.filename,
    };

    const data = await Cover.findByIdAndUpdate(id, input, { new: true });

    if (!data) {
      return res.status(404).json({
        success: false,
        msg: "Resource not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Post updated successfully",
      data,
    });
  } catch (error) {
    console.error("Error in PUT handler:", error);

    // Determine if the error is related to database issues
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        msg: "Invalid ID format",
      });
    }

    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
}
