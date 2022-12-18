const express = require('express');
const router = express.Router();
const db = require('../database')
const path = require("path");
const session = require("express-session");

router.use(session({
    secret : 'NoneOfMyBusiness',
    resave : true,
    saveUninitialized : true
}));
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/admin', function (req, res, next) {
    res.render('login');
});
router.post('/login', function (req, res,next) {
    // Capture the input fields
    const username = req.body.Username;
    const password = req.body.Password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
        if (username == "q6L3AdgDHi" && password == "ErS6kH8Sba76nB@g") {
            req.session.loggedin = true;
            req.session.username = "MrShD";
            res.redirect('/admin/comments');
            res.end();
        } else {
            res.send('Incorrect Username and/or Password!');
            res.end();
        }
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});
router.post('/comment', function(req, res, next) {
  const name = req.body.name;
  const subject = req.body.subject;
  const email = req.body.email;
  const message = req.body.message;

  const sql = `INSERT INTO comments (sender_name, email, subject, message, created_at) VALUES ("${name}", "${email}", "${subject}", "${message}", NOW())`;

  db.getConnection().then( conn => conn.query(sql, function(err) {
    if (err) throw err;
    console.log('record inserted');
    // req.flash('success', 'Data added successfully!');

    res.redirect('/');
  }));
  res.redirect('/')
});
router.get('/blog-single', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/blog-single.html'));
});
router.get('/contact-us', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/contact.html'));
});
router.get('/admin/comments',async (req, res)=>{
    if (req.session.loggedin) {
        try {
            const result = await db.query("select * from comments");
            res.render('comment',{
                Comments:result
            });
        } catch (err) {
            throw err;
        }
    } else {
        // Not logged in
        res.redirect('/admin');
    }
    res.end();

})
module.exports = router;
