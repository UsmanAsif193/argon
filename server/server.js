const userRouter = require('./Api/Router/userRouter');
const loginRouter = require('./Api/Router/loginRouter');
const forgetRouter = require('./Api/Router/forgetRouter')
const resetRouter = require('./Api/Router/resetRouter')
const connectDB = require('./Database/db'); // Import your database connection file
const path = require("path");
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const AuthGitHubRouter = require('./Api/Router/AuthGitHubRouter');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));
app.use(express.static("./build"));

// useage

// ============Work Area================//
connectDB();
app.use('/signup', userRouter);
app.use('/api/login', loginRouter);
app.use('/forgot', forgetRouter);
app.use('/resetpassword', resetRouter);
app.use('/authenticate', AuthGitHubRouter);


// ===========Deploy Purposes===========//
if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    })
}



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log('server is running'); })