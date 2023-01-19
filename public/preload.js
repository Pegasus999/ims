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
    const file = fs.readFileSync("./products.csv", "utf8");
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
    const stream = fs.createReadStream("./products.csv", { encoding: "utf8" });
    stream.on("data", (chunk) => {
      const rows = chunk.split("\n");
      const lastRow = rows[rows.length - 1].split(",");
      const lastId = parseInt(lastRow[0]) + 1;
      id = lastId;
    });
    stream.on("end", () => {
      const string = `\n${id},${product["name"]},${product["price"]},true,${product["wholesale"]},${product["barcode"]}`;
      fs.appendFile("./products.csv", string, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Data written to file successfully");
        }
      });
    });
  });
  contextBridge.exposeInMainWorld("SaveEdit", (item) => {
    const file = fs.createReadStream("./products.csv", { encoding: "utf8" });
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
      fs.writeFileSync("./products.csv", buffer.join("\n"));
    });
  });
  contextBridge.exposeInMainWorld("Delete", (ids) => {
    const file = fs.createReadStream("./products.csv", { encoding: "utf8" });
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
      fs.writeFileSync("./products.csv", buffer.join("\n"));
    });
  });
  contextBridge.exposeInMainWorld("Pass", (products) => {
    const file = fs.createReadStream("./session.csv", { encoding: "utf8" });
    let buffer = [];
    let found = [];
    file.on("data", (chunk) => {
      const rows = chunk.split("\n");
      console.log(rows);
      products.forEach((product) => {
        rows.forEach((row) => {
          let id = row.split(",");
          if (product.id === id[0]) {
            buffer.push(
              `${product.id},${product.name},${product.price},${
                product.quantity + parseInt(id[3])
              }`
            );
            found.push(product);
          } else {
            buffer.push(row);
          }
        });
      });
    });
    file.on("end", () => {
      fs.writeFileSync("./session.csv", buffer.join("\n"));
      console.log(found);
      let difference = products.filter((x) => !found.includes(x));
      console.log(difference);
      difference.forEach((item) => {
        const string = `\n${item.id},${item.name},${item.price},${item.quantity}`;
        fs.appendFile("./session.csv", string, (error) => {
          if (error) {
            console.error(error);
          } else {
            console.log("Data written to file successfully");
          }
        });
      });
    });
  });
});
