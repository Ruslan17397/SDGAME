const mongoose = require('mongoose');
const URL = "mongodb+srv://gameUser:gameUser@cluster0.mwrdr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DBConnected successfully");
});
module.exports = connectDB;