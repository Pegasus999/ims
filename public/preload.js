const { contextBridge } = require("electron");
const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");

const { Parser } = require("json2csv");
// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
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

    // Create a read stream for the file
    const stream = fs.createReadStream("./products.csv", { encoding: "utf8" });

    // Set up a listener for the 'data' event
    stream.on("data", (chunk) => {
      // Split the chunk into rows
      const rows = chunk.split("\n");
      const lastRow = rows[rows.length - 1].split(",");
      const lastId = parseInt(lastRow[0]) + 1;
      // Increment the row count by the number of rows in the chunk
      id = lastId;
    });

    // Set up a listener for the 'end' event
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
    const regex = new RegExp(`^${id}`);

    file.on("data", (chunk) => {
      const rows = chunk.split("\n");
      for (const row of rows) {
        if (regex.test(row)) {
          console.log(row);
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
