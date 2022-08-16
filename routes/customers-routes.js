const express = require("express");
const router = express.Router();
const { Customers } = require("../models/customers-model");

router.get("/", async (req, res) => {
  const customers = await Customers.find();
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customers.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send(`Unable to find the Customer with the id: ${req.params.id}`);
  res.send(customer);
});

router.post("/", async (req, res) => {
  const customer = new Customers({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  try {
    result = await customer.save();
    res.send(result);
  } catch (ex) {
    res.status(404).send("Unsuccessful");
  }
});

router.put("/:id", async (req, res) => {
  const customer = await Customers.findByIdAndUpdate(
    { _id: req.params.id },
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!customer)
    return res
      .status(404)
      .send(`Unable to find the Customer with the id: ${req.params.id}`);
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customers.findByIdAndRemove(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send(`Unable to find the Customer with the id: ${req.params.id}`);
  res.send(customer);
});

module.exports = router;
