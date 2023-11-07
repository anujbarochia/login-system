const { Router } = require("express");
const router = Router();

const matchList = [
  {
    no: "match-1",
    teams: "IND vs AUS",
    date: "09-06-2019",
    location: "LONDON",
  },
  {
    no: "match-2",
    teams: "IND vs PAK",
    date: "16-06-2023",
    location: "MANCHESTER",
  },
  {
    no: "match-3",
    teams: "IND vs ENG",
    date: "30-06-2023",
    location: "MANCHESTER",
  },
];

// MIDDLEWARE
router.use((req, res, next) => {
  if (req.session.user) next();
  else res.send(401);
});

// GET
router.get("/ind-matches", (req, res) => {
  const { location } = req.query;
  if (location) {
    const filteredMatches = matchList.filter((el) => el.location == location);
    res.send(filteredMatches);
  } else res.send(matchList);
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
