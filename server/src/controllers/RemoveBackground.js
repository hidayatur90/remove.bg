exports.removeBackground = async (blob) => {
  try {
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", blob);

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { "X-Api-Key": process.env.REMOVEBG_API_KEY },
      body: formData,
    });

    if (response.ok) {
      return response.arrayBuffer();
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error removing background:", error);
    throw error;
  }
};
