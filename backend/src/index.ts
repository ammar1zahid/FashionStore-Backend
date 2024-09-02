import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Routers from './routes';
import { connect } from './config/db';
import corsOptions from './config/cors';


dotenv.config();

const app = express();
const port= process.env.PORT || 5000

// Applying CORS middleware to the app
app.use(cors(corsOptions));

// Middlewares
app.use(cookieParser()); // for storing in cookies
app.use(express.json()); // Parsing JSON in request body

// Routes
 app.use("/api", Routers);

 connect();
// Starting the server on the specified port
app.listen(port, () => {
   
    console.log(`Backend running on port ${port}`);
});

export default app;
