module.exports = {
  getInventory: (req, res) => {
    const db = req.app.get("db");
    db.get_inventory()
      .then(inventory => {
        res.status(200).send(inventory);
      })
      .catch(e => {
        console.log(e);
        res.status(500).send("Couldn't get inventory");
      });
  },

  create: (req, res) => {
    const { name, price, imgurl } = req.body;

    const db = req.app.get("db");
    db.create_product(name, price, imgurl)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.status(500).send("Couldn't create product");
      });
  },

  delete: (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.delete_product(id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.status(500).send("Couldn't delete product.");
      });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { name, price, imgurl } = req.body;

    const db = req.app.get("db");

    db.update_product(id, name, price, imgurl)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.status(500).send("Couldn't update product.");
      });
  }
};
