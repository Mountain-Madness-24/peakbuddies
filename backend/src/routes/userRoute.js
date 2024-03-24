const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.patch("/updateUser", async (req, res) => {
  const { school, recentExperience } = req.body;

  try {
    const userId = req.user.userId;

    // Update the user's availability to false
    const updatedUser = await User.findOneAndUpdate(
      { userId: userId },
      { $set: { school, recentExperience } },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with success message
    res.status(200).json({
      message: "User's school and recent experience updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user's school and recent experience:", error);
    res
      .status(500)
      .json({
        message: "Failed to update user's school and recent experience",
        error: error,
      });
  }
});

router.get("/getusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users", error: error });
  }
});

router.get("/getuser/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user", error: error });
  }
});

router.get("/organizers", async (req, res) => {
  try {
    const organizers = await User.find({ isOrganizer: true });
    res.status(200).json(organizers);
  } catch (error) {
    console.error("Error fetching organizers:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch organizers", error: error });
  }
});

router.get("/organizers", async (req, res) => {
  try {
    const organizers = await User.find({ isOrganizer: true });
    res.status(200).json(organizers);
  } catch (error) {
    console.error("Error fetching organizers:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch organizers", error: error });
  }
});

router.get("/getAvailableUsers", async (req, res) => {
  try {
    const availableUsers = await User.find({ isAvailable: true });
    res.status(200).json(availableUsers);
  } catch (error) {
    console.error("Error fetching organizers:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch organizers", error: error });
  }
});

router.patch("/makeUnavailable", async (req, res) => {
  try {
    const userId = req.user.userId;

    // Update the user's availability to false
    const updatedUser = await User.findOneAndUpdate(
      { userId: userId },
      { $set: { availability: false } },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with success message
    res.status(200).json({
      message: "User's availability updated to unavailable",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user's availability:", error);
    res
      .status(500)
      .json({ message: "Failed to update user's availability", error: error });
  }
});

router.patch("/makeAvailable", async (req, res) => {
  try {
    const userId = req.user.userId;

    // Update the user's availability to false
    const updatedUser = await User.findOneAndUpdate(
      { userId: userId },
      { $set: { availability: true } },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with success message
    res.status(200).json({
      message: "User's availability updated to available",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user's availability:", error);
    res
      .status(500)
      .json({ message: "Failed to update user's availability", error: error });
  }
});

module.exports = router;
