const mongoose = require("mongoose");

module.exports = {
  connect: (DB_HOST) => {
    /*---------- Setting UP environment -----------*/
    // Update URL --> Sebagai String
    mongoose.set("useNewUrlParser", true);
    // Using findOneAndUpdate than  findAndModify
    mongoose.set("useFindAndModify", false);
    // Using createIndex than ensureIndex
    mongoose.set("useCreateIndex", true);
    // Using monitoring server engine
    mongoose.set("useUnifiedTopology", true);
    /*---------- Connect to DB --------------------*/
    mongoose.connect(DB_HOST, (e) => {
        if(!e){
            console.log(`Alamat database: ${DB_HOST} telah terkoneksi`);
        }
    });
    /*---------- Checking if fail -----------------*/
    mongoose.connection.on("error", (e) => {
      console.error(e);
      console.log(
        "Koneksi mongoDB ERROR. Patikan mongoDB berjalan."
      );
      process.exit();
    });
  },
  close: () => {
    mongoose.connection.close();
  },
};
