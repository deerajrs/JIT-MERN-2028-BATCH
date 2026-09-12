//bring express in Node.js
const express=require("express")
const cors=require("cors");
//create express app using what we imported
const app=express();
//use cors middleware to handle request
app.use(cors());
 const tasks =[
        {
            id: 1,
            title: "Learn React",
            description: "Understanding Components",
            status: "Completed"
        },
        {
            id: 2,
            title: "Learn JavaScript",
            description: "Understanding Async/Await",
            status: "Pending"
        },
        {
            id: 3,
            title: "Learn MongoDB",
            description: "Database",
            status: "Completed"
        },
    ];

app.get("/api/tasks",(req,res)=>{
    res.json(tasks);

});

//api route(Testing Backend)
app.get("/",(req,res)=>{
    res.send("Backend is working!!")
    
});
// start the server and listen to port 5000
app.listen(5000,()=>{
    console.log("Server Is Running On Port 5000")
});
