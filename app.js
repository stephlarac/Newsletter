const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/signup.html")
})

app.post('/',(req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    
    const data = {
        members:[ //array of objects
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,

                }
            }
        ]
    }

    const jsonData = JSON.stringify(data); //convertir de js a json

    const dc = "us21";
    const listID = "6186c2c280";
    const url = "https://" + dc +".api.mailchimp.com/3.0/lists/"+listID;

    const options= {
        method: "POST",
        auth: "stephlarac:345d537d0298e5f5c98a9b003313d346-us21"
    }

    const request = https.request(url, options, (response)=>{
        response.on("data", (data)=>{ //.on when an HTTP request hits the server
            //console.log(JSON.parse(data));

            if(response.statusCode == 200){
                res.sendFile(__dirname + "/success.html")
            } else{
                res.sendFile(__dirname + "/failure.html")
            }
        }) 
    }) 
    //request.write(jsonData);
    request.end();
});

app.post("/failure", (req,res)=>{
    res.redirect("/");
})

app.listen(process.env.PORT || port,()=>{
    console.log("The server is running on port " + port);
})

//API key
// 345d537d0298e5f5c98a9b003313d346-us21

//audience ID
//6186c2c280