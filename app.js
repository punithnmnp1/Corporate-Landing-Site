const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 3000;
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
// Serve static files from the "public" directory
app.use(express.static('index.html'));


const connectToMongo = async () => {
  await mongoose.connect('mongodb+srv://sujith123:GvI7bhQLma2FzZpq@contactdb.jyo8itd.mongodb.net/?retryWrites=true&w=majority');
  console.log("Connected to MongoDB");
};

connectToMongo();

// Create a Mongoose schema for your message data
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,

});

// Create a Mongoose model based on the schema
const Message = mongoose.model('Message', messageSchema);

// Middleware to parse JSON data
app.use(bodyParser.json());

// Route to handle form submissions and store data in MongoDB
app.post('/submit-message', async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(name);
  console.log(email);
  console.log(subject);
  console.log(message);

  const newMessage = new Message({
    name,
    email,
    subject,
    message,
  });

  try {
    // Save the document to the database using async/await
    await newMessage.save();
    res.status(200).send('Message saved successfully');
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).send('Error saving message');
  }
});

// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
