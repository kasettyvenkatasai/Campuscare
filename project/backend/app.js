const express = require('express');
const mongoose =require('mongoose');
const app = express();
const morgan = require('morgan');
const Doctor = require('./model/doctor.js')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {getmongoconnect} = require('./connection.js/connection');
const router = require('./routes/routes');
const cron = require('node-cron');
const moment = require('moment'); 
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');



const path =  require('path');

const helmet  =  require('helmet');
const errorHandler = require('./middleware/errorhandler.js');
const fs = require('fs');

const DoctorRouter  = require('./routes/DoctorRouter.js');
const StudentRouter = require('./routes/StudentRouter.js');
const AdminRouter = require('./routes/AdminRouter.js');
const SuserAdmin = require('./routes/SuserAdmin.js');

const generateDefaultSlots = () => {
  const slots = [];
  const start = 9 * 60; 
  const end = 17 * 60; 
  const step = 15; 

  for (let time = start; time < end; time += step) {
    const startHours = Math.floor(time / 60);
    const startMinutes = time % 60;
    const endHours = Math.floor((time + step) / 60);
    const endMinutes = (time + step) % 60;

    const formattedSlot = `${startHours.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')} - ${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
    slots.push(formattedSlot);
  }

  return slots;
};
const resetSlotsForDay = async (day) => {
  const defaultSlots = generateDefaultSlots();

  try {
    
    const result = await Doctor.updateMany(
      {},
      {
        $set: { [`slots.${day}`]: defaultSlots },
        $currentDate: { lastUpdated: true },
      }
    );
    console.log(result)
    console.log(`Reset slots for ${day}. Matched: ${result.matchedCount}, Updated: ${result.modifiedCount}`);
  } catch (error) {
    console.error("Error resetting slots:", error);
  }
};

cron.schedule('37N 0 * * *', async () => {
  const yesterday = moment().subtract(1, 'day').format('dddd'); 
  console.log(`Resetting slots for ${yesterday}`);
  await resetSlotsForDay(yesterday);
});


app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
getmongoconnect('mongodb+srv://druvadruvs:Druva%402907@cluster0.7eaal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{console.log("mongoDb connected")}).catch((err)=>{console.log("mongo db connection error" + err)});
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enables GraphiQL UI for testing
}));

app.use(cookieParser());
app.use(express.json()); 
// app.use(express.urlencoded({ extended: false })); 

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('dev', { stream: accessLogStream }));
// app.use(morgan(':method :url  - :response-time mss'));

app.use(
  helmet({
      contentSecurityPolicy: false,
      frameguard: { action: 'deny' }, 
  })
);


app.use('/',StudentRouter)
app.use('/',DoctorRouter)
app.use('/',AdminRouter)
app.use('/',SuserAdmin)

app.use(errorHandler);

app.use(router); 



const port = 3020;
app.listen(port,()=>{
    console.log('server is listening on port' + port)
})