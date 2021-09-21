const Server = require("./server");

const app = new Server().app();

app.listen(5000, () => {
  console.log("Server is running at port 5000");
})