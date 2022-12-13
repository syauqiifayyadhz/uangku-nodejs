const express = require("express");
const mysql = require("mysql");
const BodyParser = require("body-parser");
const app = express(); 

app.use(BodyParser.urlencoded({extended:true}))

app.set("view engine", "ejs")
app.set("views", "views")

const db = mysql.createConnection({
    host:"localhost",
    database:"uangku",
    user:"root",
    password:"",
})

db.connect((err)=>{
    if(err) throw err
    console.log('database connected...')

    
    // get data
    app.get("/",(req,res)=>{
        const viewPengeluaran = "SELECT * FROM pengeluaran  ;"
        
        
        db.query(viewPengeluaran, (err, result)=> {
            const pengeluarans = JSON.parse(JSON.stringify(result))

            res.render("index", {pengeluarans: pengeluarans, totals:totals,  title:"Daftar Pengeluaran", no:"1"})
        })

        const hitungTotal = "SELECT SUM(nominal) as total FROM pengeluaran;"
        db.query(hitungTotal, (err, result)=> {
            const totals = JSON.parse(JSON.stringify(result))
               
            res.render("index", {totals:totals})
        })

    })

    // app.get("/",(req,res)=>{
    //     const hitungTotal = "SELECT COUNT(nominal) as total FROM pengeluaran;"
       
    //     db.query(hitungTotal,  (err, result)=> {
    //         const totals = JSON.parse(JSON.stringify(result))
    //         res.render("index", {totals: totals})
    //     })
        

    // })



    // app.get("/",(req,res)=>{
    //     const hitungTotal = "SELECT COUNT(nominal) as total FROM pengeluaran"
    //     db.query(hitungTotal,  (err, result)=> {
    //         res.render("index", {totals:"hai"})
    //     })
    // })
   


    // insert data
    app.post("/tambahPengeluaran", (req, res)=>{
        const insertPengeluaran = `INSERT INTO pengeluaran (nominal, keterangan, tgl) VALUES ('${req.body.nominal}','${req.body.keterangan}','${req.body.tgl}');`
        db.query(insertPengeluaran, (err, result)=>{
            if(err) throw err
            res.redirect("/")
        })
    })

    
    
    
    
    
})

app.listen(8000, ()=>{
    console.log('server ready...')
})




