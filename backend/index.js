const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const validator = require('validator');
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb://localhost/crypto', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to the database');
    } catch (error) {
      console.error('Failed to connect to the database:', error.message);
    }
  }

  connectToDatabase();


app.listen(5000,()=>{
    console.log("Be started at port 5000");
})

app.post('/SignIn', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      if (password === existingUser.password) {
        res.status(200).send({ message: "Login successfully", user: existingUser });
      } else {
        res.status(400).send({ message: "Password didn't match" });
      }
    } else {
      res.status(404).send({ message: "User Not Registered" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});


app.post('/',async (req,res)=>{
    try {
        const { firstName, lastName, email, number, password, correctPassword } = req.body;
        
        const existingUser = await User.findOne({ email: email });
        
        if (existingUser) {
          res.status(400).send({ message: "User already registered" });
          
        } else {
          const user = new User({
            firstName,
            lastName,
            email,
            number,
            password,
            correctPassword
          });
    
          await user.save();
          res.send({ message: "Successfully registered" });
        }
      } catch (error) {
        res.send({ error: error.message });
      }
})

const userSchema = new mongoose.Schema({
    firstName: {
      type:String,
      require: true
    },
    lastName: {
      type:String,
      require: true
    },
    email: {
      type:String,
      require:true
  },
    number: {
      type:Number,
      require: true,
      maxlength:10,
      minlength:10
    },
    password: {
      type:String,
      require: true
    },
    correctPassword: {
      type:String,
      require: true
    }
})

const User = new mongoose.model("User", userSchema);