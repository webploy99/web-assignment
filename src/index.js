const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const borrowRoutes = require("./routes/borrowRoutes");
const authorBookRoutes = require("./routes/authorBookRoutes"); // Import the authorBook routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", authorRoutes);
app.use("/api", bookRoutes);
app.use("/api", borrowRoutes);
app.use("/api", authorBookRoutes); // Use the authorBook routes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
