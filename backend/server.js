const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB databse connection established successfully");
});

const mainTasksRouter = require('./routes/mainTasks');
const extraTasksRouter = require('./routes/extraTasks');
const scheduleRouter = require('./routes/schedule');
const achievementsRouter = require('./routes/achievements');
const gratefullnessRouter = require('./routes/gratefullness');

app.use('/mainTasks', mainTasksRouter);
app.use('/extraTasks', extraTasksRouter);
app.use('/schedule', scheduleRouter);
app.use('/achievements', achievementsRouter);
app.use('/gratefullness', gratefullnessRouter);


app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})