const { Router } = require("express");
const router = Router();

const matchList = [
  { no: "match-1", teams: "IND vs PAK", date: "14-10-2023" },
  { no: "match-2", teams: "IND vs ENG", date: "29-10-2023" },
  { no: "match-3", teams: "IND vs SA", date: "05-11-2023" },
];

// MIDDLEWARE
router.use((req, res, next) => {
  if (req.session.user) next();
  else res.send(401);
});

// GET
router.get("/ind-matches", (req, res) => {
  console.log("hi");
  // res.cookie("visited", true, {
  //   maxAge: 60000,
  // });
  res.send(matchList);
});

router.get("/ind-matches/:no", (req, res) => {
  const { no } = req.params;
  console.log(`requested match no => ${no}`);
  const match = matchList.find((el) => el.no === no);
  res.send(match);
});

// POST
router.post("/ind-matches", (req, res) => {
  console.log(req.body);
  matchList.push(req.body);
  console.log("pushed data to the DB");
  res.sendStatus(201);
});

module.exports = router;
