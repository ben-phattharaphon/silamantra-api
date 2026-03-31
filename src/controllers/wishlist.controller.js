import {
  addToWishlist,
  getWishlistByUser,
  removeFromWishlist,
} from "../services/wishlist.service.js";

export const addWishlist = async (req, res, next) => {
  try {
    const { stoneId } = req.body;
    const userId = req.user.id;
    const result = await addToWishlist(userId, stoneId);
    res.status(201).json({ message: "Added to wishlist", result });
  } catch (err) {
    next(err);
  }
};

export const getWishlist = async (req, res, next) => {
  try {
    const result = await getWishlistByUser(req.user.id);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const deleteWishlist = async (req, res, next) => {
  try {
    const { id } = req.params; // รับ ID ของรายการ wishlist ที่จะลบ

    // เรียกใช้ service ที่เราเขียนไว้ (ตรวจสอบชื่อฟังก์ชันให้ตรงกับใน service นะครับ)
    const result = await removeFromWishlist(id);

    res.status(200).json({ message: "Removed from wishlist", result });
  } catch (err) {
    next(err);
  }
};
