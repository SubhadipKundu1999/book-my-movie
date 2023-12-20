const express = require('express');


const dotenv = require('dotenv');
const mongoose = require('mongoose');

const userRouter = require("./routes/user")
const adminRouter = require("./routes/admin");
const moviesRouter = require("./routes/movie")
const bookingRouter = require("./routes/Booking")

dotenv.config();
const app = express();

//cors
const cors = require('cors');
app.use(cors());  //middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

//routes middleware
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", moviesRouter);
app.use("/booking", bookingRouter);

const port = 5000;

//middlewares
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hii Server");
})

mongoose.connect(process.env.MONGODB_CONN_URI)
    .then(() => {
        console.log("mongodb connected successfully")
        return app.listen(port, () => {
            console.log("listening from port", port)
        })
    })
    .catch(e => console.log(e));

