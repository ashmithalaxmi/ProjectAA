const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const cors = require("cors");
const app = express();
const collection = require("./models/mongo"); // Assuming your Mongoose model is exported as 'collection'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb+srv://ashwatikarunanidhi:j03iv6ztfquCtWHK@skillm.x90cfoj.mongodb.net/?retryWrites=true&w=majority&appName=SkillM")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log('failed');
    });

// Endpoint to get user details by email
app.get("/getuserdetail", async (req, res) => {
    const { email } = req.query;

    try {
        // Searching for the user with the provided email
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If user found, send the user details
        res.status(200).json({ user });
    } catch (error) {
        // If an error occurs, send an error response
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update user password endpoint
app.post('/update', async (req, res) => {
    const { email, newpassword } = req.body;
  
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

app.get('/update', async (req, res) => {
    const requestingUser = req.query.requestingUser;

    const link = `${req.headers.referer}ChangePass?email=${encodeURIComponent(requestingUser)}`;

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
});

const getUserRoleByEmail = async (email) => {
    try {
        // Query MongoDB to get the user's role based on the provided email
        const user = await collection.findOne({ email });
        if (user) {
            return user.types; // Return the user's role
        } else {
            return null; // User not found
        }
    } catch (error) {
        console.error("Error fetching user role:", error);
        throw error;
    }
};

app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const check = await collection.findOne({ email, password });
        if (check) {
            // Get the user's role
            const role = await getUserRoleByEmail(email);
            res.json({ exist: true, role ,email }); // Include the user's role in the response
        } else {
            res.json({ exist: false });
        }
    } catch (e) {
        res.json({ error: e.message });
    }
});

app.post("/signup", async (req, res) => {
    const { name, email, password, types, contact, role } = req.body;

    try {
        const check = await collection.findOne({ email: email });
        console.log(check);

        if (check) {
            return res.send("exist");
        } else {
            const data = new collection({
                name: name,
                email: email,
                password: password,
                types: types,
                contact: contact,
                role: role
            });
            await data.save();
            return res.send("notexist");
        }

    } catch (e) {
        return res.send("fail");
    }
});

app.post("/skills", async (req, res) => {
    const { userID, tech, proficiency, certification, status } = req.body;

    try {
        const check = await collection.findOne({ userID: userID });
        console.log(check);

        if (check) {
            return res.send("exist");
        } else {
            const data = new collection({
                userID: userID,
                tech: tech,
                proficiency: proficiency,
                certification: certification,
                status: status
            });
            await data.save();
            return res.send("notexist");
        }

    } catch (e) {
        return res.send("fail");
    }
});

app.get('/getUserID', async (req, res) => {
    try {
      // Assuming you are passing email as a query parameter
      const { email } = req.query;
  
      // Fetch user details based on email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Send userID (ObjectID) in response
      res.json({ userID: user._id });
    } catch (error) {
      console.error('Error fetching userID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.listen(8000, () => {
    console.log("port connected");
});
