const express = require('express')
const path = require('path')
const productRoutes = require('./routes/productRoutes')
const cors = require('cors')
const env = process.env.NODE_ENV
try {
    switch(env) {
        case 'undefined':
            require('dotenv').config()
            break
        case 'development':
            require('dotenv').config({
                path: path.resolve(process.cwd(), '../.env'),
            })
            break
        default:
            Error('Unrecognized Environment')
    }
} catch (err) {
    Error('Error trying to run file')
}

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());

app.use(cors())

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
