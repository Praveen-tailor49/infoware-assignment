var http = require('http')
const express = require('express')
const cors = require("cors")
const mysql = require('mysql');

const app =  express()
app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    methods:['GET','POST'],
}))

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    database:'infoware',
});

app.post('/', (req,res)=>{

    const {username, password } = req.body;
    console.log(username);

    if(username === 'admin' && password === 'admin123'){
        res.sendStatus(200);
    } else {
        db.query(`SELECT * FROM userData WHERE username = ? AND password = ?`,
         [username, password],
        (err,result)=>{
            console.log(result);
            
            if(result.length !== 0){
                 res.sendStatus(201);
            } else if(result.length === 0){
                res.status(400).json('empty');
            } else {
                res.sendStatus(400);
            }
        }
        )
    }
    
    
    
}
)


app.post('/register', (req,res)=>{

    const {username, password , email} = req.body;

    console.log(username +","+ password +","+ email);


    db.query(`INSERT INTO userData (username, password, email) VALUES (?,?,?)`,
    [username, password , email],
    (err,result)=>{
        if(err){
            res.status(400).json(err);
        }
        else{
            res.status(200).json('Registered Successfully');
        }
    }

    )
    
    
})


app.post('/add-product', (req,res)=>{

    const {productname, productimage , productprice} = req.body;

    console.log(productname +","+ productimage +","+ productprice);


    db.query(`INSERT INTO products (productname, productimage, productprice) VALUES (?,?,?)`,
    [productname, productimage , productprice],
    (err,result)=>{
        if(err){
            res.status(400).json(err);
        }
        else{
            res.status(200).json('Add Successfully');
        }
    }

    )
    
    
})


app.post('/add-order', (req,res)=>{

    const {productname, productimage , productprice, username} = req.body;

    console.log(productname +","+ productimage +","+ productprice +","+username);


    db.query(`INSERT INTO orders (productname, productimage, productprice, username) VALUES (?,?,?,?)`,
    [productname, productimage , productprice, username],
    (err,result)=>{
        if(err){
            console.log(err);
            res.sendStatus(400).json(err);
            
        }
        else{
            console.log('scc');
            res.sendStatus(200)
        }
    }

    )
    
    
})


app.post('/allProduct', (req,res) => {
    db.query(
        `SELECT * FROM products`,
        (err,result)=>{
            return res.json(result);
        }
    )
})

app.post('/allOrder', (req,res) => {
    db.query(
        `SELECT * FROM orders`,
        (err,result)=>{
            return res.json(result);
        }
    )
})

app.post('/userOrder', (req,res) => {
    
    const username = req.body.username
    db.query(`SELECT * FROM orders WHERE username = ? `,
         [username],
         (err, result)=>{
            return res.send(result)
         })
})

app.listen(3001, ()=>{
    console.log('sever is run on 3001');
})