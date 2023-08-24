const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// get all categories
router.get("/", async (req, res) => {
  try {
    const catData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get 1 category by id
router.get("/:id", async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!catData) {
      res.status(404).json({ message: "No category found with that id." });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create category
router.post("/", async (req, res) => {
  try {
    const catData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// upcate category by id
router.put("/:id", async (req, res) => {
  try {
    const catData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete category by id
router.delete("/:id", async (req, res) => {
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!catData) {
      res.status(404).json({ message: "No category found with that ID." });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
