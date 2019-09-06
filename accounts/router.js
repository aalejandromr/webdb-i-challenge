const router = require("express").Router();
const db = require("../data/dbConfig");

router.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts");
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, budget } = req.body;
    const newAccount = await db("accounts").insert({ name, budget });
    if (newAccount.length > 0) {
      return res.status(200).json({
        newAccountId: newAccount[0]
      });
    }
    res.status(400).json({
      error: "Bad Request"
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const account = await db("accounts").where({
      id
    });
    if (account.length > 0) {
      return res.status(200).json({
        account: account[0]
      });
    }
    res.status(404).json({
      error: "Account not found with given ID"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { name, budget } = req.body;
    const updatedAccount = await db("accounts")
      .where({ id })
      .update({
        name,
        budget
      });
    if (updatedAccount) {
      return res.status(200).json({ updatedAccount });
    }
    res.status(404).json({
      error: "Account not found with given ID"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
