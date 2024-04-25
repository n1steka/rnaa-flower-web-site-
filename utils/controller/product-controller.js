import Template from "../../models/product-model";

export async function handleGetRequest(req, res) {
  try {
    const data = await Template.find();
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
    const data = await Template.findById(id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in GET handler:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
export async function handleGetRequestDetail(req, res) {
  try {
    const data = await Template.findById(req.params.id);
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
    const data = await Template.create(input);

    res.status(201).json({
      success: true,
      msg: "Post created successfully",
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
    const data = await Template.findByIdAndDelete(id, {
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

export async function handlePutRequest(req, res) {
  try {
    const { id } = req.query;
    const oldData = await Template.findById(id);
    if (!oldData) {
      return res.status(404).json({
        success: false,
        error: "Record not found",
      });
    }
    const input = {
      ...req.body,
      photo: req.file?.filename,
    };
    const data = await Template.findByIdAndUpdate(id, input, { new: true });
    res.status(201).json({
      success: true,
      msg: "PUT updated successfully",
      data,
    });
  } catch (error) {
    console.error("Error in PUT handler:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
