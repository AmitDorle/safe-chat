const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/User')
const Message = require('./models/Message')

const app = express();
app.use(express.json());

const PORT = 5000;

const MONGO_URI = "mongodb+srv://anand123:anand123@nursery-plant.mpanrx9.mongodb.net/chitchat?retryWrites=true&w=majority"

mongoose.connect(MONGO_URI, ()=>{
  console.log("Connected to MongoDB");
})

app.get('/health', (req, res)=>{
    res.json({
      status: 'All Good 👍'
    })
})

app.post('/signup', async(req, res)=>{
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    fullName: fullName,
    email: email,
    password: password
  })

  const savedUser = await newUser.save();

  res.send(savedUser);
})

app.post('/login', async(req, res)=>{
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    password: password
  })

  if(user){
    res.send({
      success: true,
      data: user
    })
  }
  else
  {
    res.send({
      success: false,
      data: "Wrong Credentials! Please try again."
    })
  }
})

app.post('/send', async(req, res)=>{
  const to = req.body.to;
  const from = req.body.from;
  const text = req.body.text;

  const newMessage = new Message({
    to: to,
    from: from,
    text: text
  })

  const savedMessage = await newMessage.save();

  res.send(savedMessage)
})

app.get('/messages', async(req, res)=>{
  const messages = await Message.find();
  res.send(messages);
})


app.listen(PORT, ()=>{
  console.log('Server starter running on port', PORT);
})
