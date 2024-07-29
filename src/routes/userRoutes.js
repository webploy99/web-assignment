// src/routes/userRoutes.js
const express = require("express");
const {
  getUserById,
  updateUser,
  deleteUser,
  getUsers,
} = require("../controllers/userController");

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
