const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/receive-data", (req, res) => {
    console.log("Data from frontend: ", req.body);

    res.json({
        message: "Backend received your data successfully",
        receivedData: req.body
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
})