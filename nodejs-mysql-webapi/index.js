require("dotenv").config();


const express = require("express");

const app = express();

 
app.use(express.json());

app.get("/user", (req, res, next) =>{
    res.json(connect.selectAll());
});

app.post("/addUser", (req, res, next) =>{
    console.log(req.body);
    res.sendStatus(402);

});


app.listen(process.env.PORT, () => {
    console.log('app is running')
});