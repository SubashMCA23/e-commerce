const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

connectDB();


app.use(express.json()); 
app.get('/', (req, res) => {
  res.send('Server is running and healthy!');
});


app.use('/api/users', userRoutes);
app.use('/api', userRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
