const mongoose = require("mongoose");
const { DB_PASS } = process.env;

// establishing a connection with MongoDB atlas cloud
mongoose.connect(
    `mongodb+srv://sgbtech96:${DB_PASS}@cluster0-hluvl.mongodb.net/chatApp?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
