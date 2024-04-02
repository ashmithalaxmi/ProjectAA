const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const nodemailer = require('nodemailer');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const mongoose=require("mongoose")
// const collection = require("./mongo")

mongoose.connect("mongodb+srv://ashmitharengasamy96:Po5M0F3TFd1H0vb5@matrix.mamlvvz.mongodb.net/?retryWrites=true&w=majority&appName=Matrix/MatrixProj")
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
        user: "ashmithalaxmi@jmangroup.com",
        pass: "Jman@600113"
      }
    });
    
    const mailOptions = {
      from: "ashmithalaxmi@jmangroup.com",
      to: requestingUser,
      subject: 'Reset Password',
      text: `change password here: ${link}`
    };
  
    await transporter.sendMail(mailOptions);
    return res.status(200).send('Sent Mail');
  })

app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{name,email,password,types}=req.body

    try{
        const check=await collection.findOne({email:email});
        console.log(check)

        if(check){
            return res.send("exist")
        }
        else{
            const data = new collection({
                name,email, password, types
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
