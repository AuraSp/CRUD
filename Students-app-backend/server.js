const mongoose = require("mongoose");
const app = require("./app");


const DB =
'mongodb+srv://Aura:studentapp@cluster0.xhgrs.mongodb.net/students-app?retryWrites=true&w=majority';
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Prisijungta prie DB...:)");
  });

const port = 5500;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
