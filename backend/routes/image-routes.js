const express = require("express")
const router = express.Router();
const { deleteImagefromDB, fetchImageController, fetchSingleImage, ImageUploadSystem } = require("../controller/image-controller")

const isadminUser = require("../middleware/admin-middleware");
const uploadmiddleware = require("../middleware/upload-image-middleware")
const authMiddleware = require("../middleware/user-middleware")



router.post('/upload',authMiddleware,isadminUser,uploadmiddleware.single('image'),ImageUploadSystem);
router.get("/all-image",authMiddleware, fetchImageController);
router.get("/:id",authMiddleware, fetchSingleImage);
router.delete("/delete/:id",authMiddleware, isadminUser, deleteImagefromDB);


module.exports = router