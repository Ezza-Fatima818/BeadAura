app.post("/add-component", async (req, res) => {
  const Component = require("./models/componentsRoutes");

  const newComponent = new JewelryComponent(req.body);
  await newComponent.save();

  res.json({ message: "Component added" });
});