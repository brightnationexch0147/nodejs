const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const Contact = require("../models/contact");

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;

// Admin index page
router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin Page",
      description: "A Nodejs Blog App built with Nodejs, Express, and MongoDB",
    };
    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

// User registration
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "Username already in use" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// Dashboard
router.get("/dashboard", async (req, res) => {
  try {
    const locals = {
      title: "Dashboard",
      description: "A Nodejs Blog App built with Nodejs, Express, and MongoDB",
    };
    const data = await Blog.find();
    const contact = await Contact.find();
    res.render("admin/dashboard", { locals, data, contact, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

// Add blog (GET)
router.get("/add-blog", async (req, res) => {
  try {
    const locals = {
      title: "Add Blog",
      description: "A Nodejs Blog App built with Nodejs, Express, and MongoDB",
    };
    res.render("admin/add-blog", { locals });
  } catch (error) {
    console.log(error);
  }
});

// Add blog (POST)
router.post("/add-blog", async (req, res) => {
  try {
    const newBlog = new Blog({
      title: req.body.title,
      body: req.body.body,
    });
    await Blog.create(newBlog);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// Edit blog (GET)
router.get("/edit-blog/:id", async (req, res) => {
  try {
    const data = await Blog.findOne({ _id: req.params.id });
    const locals = {
      title: "Edit Blog - " + data.title,
      description: "A Nodejs Blog App built with Nodejs, Express, and MongoDB",
    };
    res.render("admin/edit-blog", { locals, data, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

// Edit blog (PUT)
router.put("/edit-blog/:id", async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// Delete blog
router.delete("/delete-blog/:id", async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// Logout
router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
