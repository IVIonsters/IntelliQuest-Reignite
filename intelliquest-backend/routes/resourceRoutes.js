const express = require("express");
const db = require("../firebase/firebaseAdmin"); // Firestore setup
const router = express.Router();

// Add a new resource
router.post("/add", async (req, res) => {
  try {
    const { title, description, url, category, tags } = req.body;

    if (!title || !url || !category) {
      return res.status(400).json({ error: "Title, URL, and category are required." });
    }

    const newResource = {
      title,
      description: description || "",
      url,
      category,
      tags: tags || [],
      createdAt: new Date(),
    };

    const docRef = await db.collection("resources").add(newResource);
    res.status(201).json({ id: docRef.id, ...newResource });
  } catch (err) {
    console.error("Error adding resource:", err);
    res.status(500).json({ error: "Failed to add resource." });
  }
});

// Get all resources
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("resources").get();
    const resources = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(resources);
  } catch (err) {
    console.error("Error fetching resources:", err);
    res.status(500).json({ error: "Failed to fetch resources." });
  }
});

// Get a single resource by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection("resources").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ error: "Resource not found." });
    }

    res.status(200).json({ id: docSnap.id, ...docSnap.data() });
  } catch (err) {
    console.error("Error fetching resource:", err);
    res.status(500).json({ error: "Failed to fetch resource." });
  }
});

// Update a resource by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, url, category, tags } = req.body;

    const updatedData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(url && { url }),
      ...(category && { category }),
      ...(tags && { tags }),
      updatedAt: new Date(),
    };

    const docRef = db.collection("resources").doc(id);
    await docRef.update(updatedData);

    res.status(200).json({ id, ...updatedData });
  } catch (err) {
    console.error("Error updating resource:", err);
    res.status(500).json({ error: "Failed to update resource." });
  }
});

// Delete a resource by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const docRef = db.collection("resources").doc(id);
    await docRef.delete();

    res.status(200).json({ message: "Resource deleted successfully." });
  } catch (err) {
    console.error("Error deleting resource:", err);
    res.status(500).json({ error: "Failed to delete resource." });
  }
});

module.exports = router;
