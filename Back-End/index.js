const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/route");



const app = express();
app.use(cors({
     origin : process.env.FORNT_END_URL,
     credentials : true
}));
app.use(cookieParser());
app.use(express.json());

// Increase payload size limit (e.g., 1000MB)
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));
app.use((req, res, next) => {
    console.log(`Request body size: ${req.headers['content-length']} bytes`); // Debugging
    next();
  });

 

// Use the router
app.use('/api', router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});