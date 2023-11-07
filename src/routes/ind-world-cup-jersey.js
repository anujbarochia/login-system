const { Router } = require("express");
const router = Router();

// EXAMPLE
const jerseyList = [
  { no: 1, colour: "orange", quantity: 2 },
  { no: 2, colour: "blue", quantity: 5 },
];

// PASS AS PAYLOAD TO ADD IN CART
// { "no":2,"colour":"orange", "quantity":3 }

// GET
router.get("/cart/item", (req, res) => {
  const { cart } = req.session;
  res.send(cart);
});

// POST
router.post("/cart/item", (req, res) => {
  console.log("inside-buying-jersey-code");

  const { no, colour, quantity } = req.body;
  const cartItem = { no, colour, quantity };
  const { cart } = req.session;

  if (cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  console.log(req.session.id);
  console.log(cartItem);
  res.send(req.session.cart);
});

module.exports = router;
