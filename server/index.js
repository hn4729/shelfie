const express = require("express");
const massive = require("massive");
const controller = require("./controller");
require("dotenv").config();

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
    console.log("Database Connected");
  })
  .catch(e => console.log(e));

const app = express();

app.use(express.json());

app.get("/api/inventory", controller.getInventory);
app.post("/api/product", controller.create);
app.delete("/api/product/:id", controller.delete);
app.put("/api/product/:id", controller.update);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Listening on PORT " + process.env.SERVER_PORT);
});
