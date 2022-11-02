import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//@desc Fetch all products
//@route GET/api/products
//@access Public
router.route("/").get(getProducts).post(protect, admin, createProduct);

//@desc Fetch single product
//@route GET/api/product/:id
//@access Public
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
