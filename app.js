const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const comm = req.body.message;
    const na = req.body.nameofperson;
    const recipientEmail = req.body.username;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.EMAIL,
        to: recipientEmail,
        cc: process.env.EMAIL,
        subject: `Thanks for giving feedback, ${na}`,
        text: `Thanks for your message! You sent us the following: "${comm}"`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
            res.status(500).send("Error sending email");
        } else {
            console.log("Email sent: " + info.response);
            res.redirect("/");
        }
    });
});

app.listen(3000, function () {
    console.log("Server is running on port: 3000");
});
