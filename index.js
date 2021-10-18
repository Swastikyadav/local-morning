const Server = require("./server");

const PORT = process.env.PORT || 5000;

const app = new Server().app;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
})