const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const { default: mongoose, Schema } = require("mongoose");

mongoose.connect("mongodb+srv://admin-harshit:<Password>@cluster0.4rsqkc5.mongodb.net/cowsewaDB");
mongoose.set('strictQuery', true);
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
const gaushalasSchema={
    name:String,
    owner_name:String,
    img:String,
    address:String
}
const Gaushala=mongoose.model("Gaushala",gaushalasSchema);

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const towards=req.body.button;
    if(towards=='donate'){
        res.sendFile(__dirname+"/donate.html");
    }
    else{    
        res.sendFile(__dirname+"/register.html");
    }
});

app.get("/amount",function(req,res){
    console.log("hi");
    Gaushala.find({},function(err,foundGaushala){
        res.render('cards.ejs',{gaushalas:foundGaushala,titleImg:"#",style:"/css/amount-style.css"});
        console.log(foundGaushala)
    });
    
    
});
app.get("/fodder",function(req,res){
    console.log("hi");
    Gaushala.find({},function(err,foundGaushala){
        res.render('cards.ejs',{gaushalas:foundGaushala,titleImg:"images\\Green-fodder-crops.jpg" ,style:"/css/fodder-style.css"});
    });
    
});
app.get("/medicine",function(req,res){
    console.log("hi");
    Gaushala.find({},function(err,foundGaushala){
        res.render('cards.ejs',{gaushalas:foundGaushala,titleImg:"#",style:"/css/amount-style.css"});
    })
    
    
    
});
app.get("/payment",function(req,res){
    console.log("hi");
    
    res.sendFile(__dirname+"/payment.html");
    
});
//  Gaushala
app.get("/register",function(req,res){
    res.sendFile(__dirname+"/register.html");
});
app.post("/gaushala",function(req,res){
    const GaushalaName=req.body.GaushalaName
    const own_name=req.body.name
    const address=req.body.address;
    const gaushala=new Gaushala({
        name:GaushalaName,
        owner_name:own_name,
        address:address,
        img:"images\\g1.jpeg"
    });
    gaushala.save();
    res.render('success.ejs',{name:own_name,gaushala:GaushalaName})
});
app.listen(3000,function(){
    console.log("Server is running on port 3000")
});

