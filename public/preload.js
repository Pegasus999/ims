const { ipcRenderer, contextBridge } = require("electron");
const fs = require("fs");
const path = require("path");

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("api", {
    send: (channel, data) => ipcRenderer.send(channel, data),
    recieve: (channel, func) =>
      ipcRenderer.on(channel, (event, ...args) => func(args)),
  });
  contextBridge.exposeInMainWorld("RequestData", () => {
    const file = fs.readFileSync(
      path.join(__dirname, "/data/products.csv"),
      "utf8"
    );
    const rows = file.split("\n");
    let products = [];
    rows.map((row) => {
      let item = row.split(",");
      let object = {
        id: item[0],
        name: item[1],
        price: item[2],
        availability: item[3] === "true" ? true : false,
        wholesale: item[4],
        barcode: item[5],
      };
      products.push(object);
    });
    products.splice(0, 1);
    return products;
  });
  contextBridge.exposeInMainWorld("SaveData", (product) => {
    let id;
    const stream = fs.createReadStream(
      path.join(__dirname, "/data/products.csv"),
      { encoding: "utf8" }
    );
    stream.on("data", (chunk) => {
      const rows = chunk.split("\n");
      const lastRow = rows[rows.length - 1].split(",");
      const lastId = lastRow[0] !== "id" ? parseInt(lastRow[0]) + 1 : 1;
      id = lastId;
    });
    stream.on("end", () => {
      console.log(id);
      const string = `\n${id},${product["name"]},${product["price"]},true,${product["wholesale"]},${product["barcode"]}`;
      fs.appendFile(
        path.join(__dirname, "/data/products.csv"),
        string,
        (error) => {
          if (error) {
            console.error(error);
          } else {
            console.log("Data written to file successfully");
          }
        }
      );
    });
  });
  contextBridge.exposeInMainWorld("SaveEdit", (item) => {
    const file = fs.createReadStream(
      path.join(__dirname, "/data/products.csv"),
      { encoding: "utf8" }
    );
    let buffer = [];
    const regex = new RegExp(`^${item.id}`);
    file.on("data", (chunk) => {
      const rows = chunk.split("\n");
      for (const row of rows) {
        if (regex.test(row)) {
          console.log(row);
          buffer.push(
            `${item.id},${item.name},${item.price},${item.availability},${item.wholesale},${item.barcode}`
          );
        } else buffer.push(row);
      }
    });
    file.on("end", () => {
      fs.writeFileSync(
        path.join(__dirname, "/data/products.csv"),
        buffer.join("\n")
      );
    });
  });
  contextBridge.exposeInMainWorld("Delete", (ids) => {
    const file = fs.createReadStream(
      path.join(__dirname, "/data/products.csv"),
      { encoding: "utf8" }
    );
    let buffer = [];
    file.on("data", (chunk) => {
      const rows = chunk.split("\n");
      for (const row of rows) {
        if (ids.length == 0) file.emit("end");
        const id = row.split(",");
        if (ids.includes(id[0])) {
          ids.pop(id);
          buffer.push("\r");
          buffer.pop("\n");
        } else buffer.push(row);
      }
    });
    file.on("end", () => {
      fs.writeFileSync(
        path.join(__dirname, "/data/products.csv"),
        buffer.join("\n")
      );
    });
  });
  contextBridge.exposeInMainWorld("Pass", (products) => {
    console.log("ree");
    const file = fs.readFileSync(
      path.join(__dirname, "/data/session.csv"),
      "utf8"
    );
    let buffer = [];
    let found = [];
    const rows = file.split("\n");
    rows.forEach((element) => {
      const row = element.split(",");
      const item = products.find((x) => x.id === row[0]);
      if (item) {
        buffer.push(
          `${row[0]},${row[1]},${row[2]},${parseInt(row[3]) + item.quantity}`
        );
        found.push(item);
      } else {
        buffer.push(row);
      }
    });
    const difference = products.filter((x) => !found.includes(x));
    difference.forEach((item) => {
      buffer.push(
        `${item.id},${item.name},${item.price},${parseInt(item.quantity)}`
      );
    });
    const finalString = buffer.join("\n");
    fs.writeFileSync(path.join(__dirname, "/data/session.csv"), finalString);
  });
});
