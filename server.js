const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));


// Register

app.post("/register",(req,res)=>{

    const {name,email,password}=req.body;


    const sql =
    "INSERT INTO users(name,email,password) VALUES(?,?,?)";


    db.query(sql,[name,email,password],
    (err,result)=>{

        if(err)
        {
            res.send({
                message:"Email already exists"
            });
        }
        else
        {
            res.send({
                message:"Registration successful"
            });
        }

    });

});



// Login

app.post("/login",(req,res)=>{

const {email,password}=req.body;


db.query(
"SELECT * FROM users WHERE email=? AND password=?",
[email,password],

(err,result)=>{


if(result.length>0)
{
res.send({
message:"Login Success"
});
}

else
{
res.send({
message:"Invalid Login"
});
}


});

});




// Products

app.get("/products",(req,res)=>{


db.query(
"SELECT * FROM products",
(err,result)=>{

res.json(result);

});


});




// Add Product

app.post("/addproduct",(req,res)=>{

const {name,price}=req.body;


db.query(
"INSERT INTO products(name,price) VALUES(?,?)",
[name,price],

(err,result)=>{

res.send("Product Added");

});


});





app.listen(3000,()=>{

console.log("Server running on port 3000");

});
