const express = require("express")
const router = express.Router();
const {deleteImagefromDB,fetchImageController,fetchSingleImage,ImageUploadSystem} = require("../controller/image-controller")
const isadminUser = require("../middleware/admin-middleware") ;
const uploadmiddleware = require("../middleware/upload-image-middleware")
const authMiddleware = require("../middleware/user-middleware")
router.post("/upload-image",isadminUser,ImageUploadSystem);
router.get("/Single-image",fetchSingleImage);
router.delete("/delete-image",isadminUser,deleteImagefromDB);
router.get("all-image",fetchImageController);