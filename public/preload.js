const { contextBridge } = require("electron");

const fs = require("fs");
const path = require("path");

process.once("loaded", () => {
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
        wholesale: item[3],
        barcode: item[4],
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
      const string = `\n${id},${product["name"]},${product["price"]},${product["wholesale"]},${product["barcode"]}`;
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
            `${item.id},${item.name},${item.price},${item.wholesale},${item.barcode}`
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
    let regex = new RegExp(`^`);
    let i = 0;

    if (ids.length > 1) {
      while (i < ids.length - 1) {
        regex = new RegExp(`${regex.source}(${ids[i]})|`);
        i++;
      }
      regex = new RegExp(`${regex.source}(${ids[ids.length - 1]})`);
    } else {
      regex = new RegExp(`${regex.source}${ids[0]}`);
    }
    file.on("data", (chunk) => {
      const rows = chunk.split("\n");
      for (const row of rows) {
        if (ids.length == 0) file.emit("end");
        const id = row.split(",");
        if (regex.test(row) && ids.includes(id[0])) {
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
});
