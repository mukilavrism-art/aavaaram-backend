import Banner from "../models/Banner.js";

/* ADD */
export const addBanner = async (req, res) => {
  const banner = await Banner.create({
    image: req.savedImage,
  });

  res.json(banner);
};

/* GET */
export const getBanners = async (req, res) => {
  res.json(await Banner.find());
};

/* UPDATE */
export const updateBanner = async (req, res) => {
  const updated = await Banner.findByIdAndUpdate(
    req.params.id,
    { image: req.savedImage },
    { new: true }
  );

  res.json(updated);
};

/* DELETE */
export const deleteBanner = async (req, res) => {
  await Banner.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
