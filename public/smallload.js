const { contextBridge } = require("electron");
const fs = require("fs");
const path = require("path");

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("EndSession", () => {
    const file = fs.readFileSync(
      path.join(__dirname, "/data/session.csv"),
      "utf8"
    );
    const rows = file.split("\n");
    let products = [];
    rows.map((row) => {
      let item = row.split(",");
      let object = {
        id: item[0],
        name: item[1],
        price: parseInt(item[2]),
        quantity: parseInt(item[3]),
      };
      products.push(object);
    });
    products.splice(0, 1);
    return products;
  });

  contextBridge.exposeInMainWorld("Done", () => {
    const string = "id,name,price,quantity";
    fs.writeFileSync(path.join(__dirname, "/data/session.csv"), string);
  });
});
