const { ipcRenderer, contextBridge } = require("electron");
const fs = require("fs");
const path = require("path");

process.once("loaded", () => {
  let dataPath;
  ipcRenderer.send("get-app-data-path");

  ipcRenderer.on("app-data-path-received", (event, appDataPath) => {
    const dataFolder = path.join(appDataPath, "data");
    const productsFile = path.join(dataFolder, "products.csv");
    const sessionFile = path.join(dataFolder, "session.csv");

    if (!fs.existsSync(dataFolder)) {
      fs.mkdirSync(dataFolder, { recursive: true });
    }

    if (!fs.existsSync(productsFile)) {
      fs.writeFileSync(
        productsFile,
        "id,name,price,availability,wholesale,barcode"
      );
    }

    if (!fs.existsSync(sessionFile)) {
      fs.writeFileSync(sessionFile, "id,name,price,quantity");
    }
    dataPath = appDataPath;
  });
  contextBridge.exposeInMainWorld("EndSession", () => {
    const file = fs.readFileSync(
      path.join(dataPath, "/data/session.csv"),
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
    fs.writeFileSync(path.join(dataPath, "/data/session.csv"), string);
  });
});
