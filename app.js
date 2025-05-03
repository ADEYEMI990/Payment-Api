const express = require("express");
const bodyParser = require("body-parser");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());

// Payment routes (with versioning)
app.use("/api/v1/payments", paymentRoutes);

// Add a root route to handle GET requests to '/'
app.get("/", (req, res) => {
  res.send("Welcome to the Payment API");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
