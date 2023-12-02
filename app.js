const express = require('express')
const app = express()
const port = 3007
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static('public'));
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
const allRoutes = require('./routes/allRoutes')
const addUserRoutes = require('./routes/addUser')


// Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});


mongoose
    .connect(
        'mongodb+srv://aeml_adrs:PKh3JtW9RlW7etBp@cluster0.iw7l3wl.mongodb.net/all-data?retryWrites=true&w=majority')
    .then(() => {
        app.listen(port, () => {
            console.log(`http://localhost:${port}/`)
        })
    })
    .catch((err) => {
        console.log(err)
    });



app.use(allRoutes);
app.use("/user/add.html",addUserRoutes);