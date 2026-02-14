const express = require("express"); //importing packages
const cors = require("cors"); // importing cors to avoid cors error, they usually occur, coz browser wont allow any backend due to security reasons

const app = express(); //to use express

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