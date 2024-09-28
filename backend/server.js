const express = require("express");
const cors = require('cors');

const connectDB = require("./config/db");
const seedRoutes = require("./routes/seedRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const statsRoutes = require("./routes/statsRoutes");
const chartRoutes = require("./routes/chartRoutes");
const combinedRoutes = require("./routes/combinedRoutes")

require("dotenv").config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", seedRoutes);
app.use("/api", transactionRoutes);
app.use("/api", statsRoutes);
app.use("/api", chartRoutes);
app.use("/api", combinedRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
