const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const cors = require("cors");
const app = express();
const collection = require("./models/mongo"); // Assuming your Mongoose model is exported as 'collection'
const SkillUser = require("./models/skills");
const Project = require("./models/project")
//const projectuser = require("./models/project")

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

app.post('/addskill', async (req, res) => {
    try {
      // Fetch userID from User collection based on email
      const { email } = req.body;
      const user = await collection.findOne({ email }); // Assuming you have 'collection' defined somewhere
      console.log(user)
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Create a new skillUser instance based on the data sent from the frontend
      const newSkillUser = new SkillUser({
        userId: user._id,
        tech: req.body.tech,
        proficiency: req.body.proficiency,
        certification: req.body.certification,
        status: req.body.status
      });
  
      // Save the new skillUser to the database
      await newSkillUser.save();
  
      // Respond with a success message
      res.status(200).json({ message: 'Skill added successfully' });
    } catch (error) {
      // If an error occurs, respond with an error status and message
      console.error('Error adding skill:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.get('/getskills', async (req, res) => {
    try {
        // Retrieve all skills from the Skill collection
        const skills = await SkillUser.find();
        
        // Check if any skills were found
        if (!skills) {
            return res.status(404).json({ message: 'No skills found' });
        }

        // If skills are found, send them as a response
        res.status(200).json(skills);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching skills:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Assuming you're using Express.js
app.patch('/approveCertificate/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the skillUser instance in the database based on the provided ID
      const skillUser = await SkillUser.findById(id);
  
      if (!skillUser) {
        return res.status(404).json({ message: 'Skill not found' });
      }
  
      // Update the status to 'Approved'
      skillUser.status = 'Approved';
      
      // Save the updated skillUser to the database
      await skillUser.save();
  
      // Respond with a success message
      res.status(200).json({ message: 'Certificate approved successfully' });
    } catch (error) {
      // If an error occurs, respond with an error status and message
      console.error('Error approving certificate:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post('/addproject', async (req, res) => {
    try {
      // Fetch userID from User collection based on email
      const { email } = req.body;
      const user = await collection.findOne({ email }); // Assuming you have 'collection' defined somewhere
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Create a new project instance based on the data sent from the frontend
      const newProject = new Project({
        userId: user._id,
        projname: req.body.projname,
        tech: req.body.tech,
        description: req.body.description,
        status: req.body.status
      });
  
      // Save the new project to the database
      await newProject.save();
  
      // Respond with a success message
      res.status(200).json({ message: 'Project added successfully' });
    } catch (error) {
      // If an error occurs, respond with an error status and message
      console.error('Error adding project:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/getproject', async (req, res) => {
    try {
        // Retrieve all skills from the Skill collection
        const proj = await Project.find();
        
        // Check if any skills were found
        if (!proj) {
            return res.status(404).json({ message: 'No project found' });
        }

        // If skills are found, send them as a response
        res.status(200).json(proj);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.patch('/approveProject/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the skillUser instance in the database based on the provided ID
      const project = await Project.findById(id);
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Update the status to 'Approved'
      project.status = 'Approved';
      
      // Save the updated skillUser to the database
      await project.save();
  
      // Respond with a success message
      res.status(200).json({ message: 'Project approved successfully' });
    } catch (error) {
      // If an error occurs, respond with an error status and message
      console.error('Error approving project:', error);
      res.status(500).json({ message: 'Internal server error' });
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
