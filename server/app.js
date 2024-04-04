const express = require("express")
const collection = require("./mongo")
const skilluser = require("./skills")
const projectuser = require("./project")
const cors = require("cors")
const nodemailer = require('nodemailer');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const mongoose=require("mongoose")
// const collection = require("./mongo")

mongoose.connect("mongodb+srv://ashwatikarunanidhi:j03iv6ztfquCtWHK@skillm.x90cfoj.mongodb.net/?retryWrites=true&w=majority&appName=SkillM")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})

app.get('/update',async (req,res)=>{
    const requestingUser = req.query.requestingUser;
  
    const link = `${req.headers.referer}ChangePass?email=${encodeURIComponent(requestingUser)}`
  
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: "ashwatikarunanidhi@jmangroup.com",
        pass: "Jman@600113"
      }
    });
    
    const mailOptions = {
      from: "ashwatikarunanidhi@jmangroup.com",
      to: requestingUser,
      subject: 'Reset Password',
      text: `change password here: ${link}`
    };
  
    await transporter.sendMail(mailOptions);
    return res.status(200).send('Sent Mail');
  })

// Assume you have a function to retrieve the user's role from MongoDB
const getUserRoleByEmail = async (email) => {
    try {
        // Query MongoDB to get the user's role based on the provided email
        const user = await collection.findOne({ email });
        if (user) {
            return user.types; // Return the user's role (e.g., 'admin' or 'user')
        } else {
            return null; // User not found
        }
    } catch (error) {
        console.error("Error fetching user role:", error);
        throw error;
    }
};

// In your login route handler
app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const check = await collection.findOne({ email, password });
        if (check) {
            // Get the user's role
            const role = await getUserRoleByEmail(email);
            res.json({ exist: true, role }); // Include the user's role in the response
        } else {
            res.json({ exist: false });
        }
    } catch (e) {
        res.json({ error: e.message });
    }
});

// app.post("/",async(req,res)=>{
//     const{email,password}=req.body

//     try{
//         const check=await collection.findOne({email:email})

//         if(check){
//             res.json("exist")
//         }
//         else{
//             res.json("notexist")
//         }

//     }
//     catch(e){
//         res.json("fail")
//     }

// })



app.post("/signup",async(req,res)=>{
    const{name,email,password,types,contact,role}=req.body

    try{
        const check=await collection.findOne({email:email});
        console.log(check)

        if(check){
            return res.send("exist")
        }
        else{
            const data = new collection({
                name:name,
                email:email,
                password:password,
                types:types,
                contact:contact,
                role:role
            });
            await data.save();
            return res.send("notexist")
        }

    }
    catch(e){
        return res.send("fail")
    }

})

app.post('/update', async (req, res) => {
    const { email, newpassword } = req.body;
    console.log(req.body);
  
    try {
      const user = await collection.findOne({ email });
      console.log(user);
  
      // Simply assign the new password without hashing
      user.password = newpassword;
      await user.save();
  
      return res.status(200).send('User Saved successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).send('Server error');
    }
  });
  

app.listen(8000,()=>{
    console.log("port connected");
})

app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    const data={
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})

