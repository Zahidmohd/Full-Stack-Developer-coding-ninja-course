const { name } = require('ejs');
const express = require('express');
const path = require('path');
const { title } = require('process');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact')

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// middleware1
// app.use(function(req, res, next){
//     req.myName="Zahid"
//     // console.log('middleware 1 called');
//     next();
// });

// middleware2
// app.use(function(req, res, next){
//     console.log('My Name from MW2', req.myName);
//     // console.log('middleware 2 called');
//     next(); 
//     });

var contactlist = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "0123456789"
    }, 
    {
        name: "Coding Ninjas",
        phone: "2316537634"
    }
]
app.get('/', function(req, res){
    // console.log('from the get route controller', req.myName);  
    // console.log(__dirname);
    // res.send('<h1>Cool, it is running! or is it?</h1>');
    return res.render('home', {title: "Contact List",
        contact_list: contactlist
    });
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
}); 
app.post('/create-contact', function(req, res){
    // contactlist.push(req.body);
    // contactlist.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    //  console.log(req.body);
    //  console.log(req.body.name);
    //  console.log(req.body.phone);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
    .then(newContact => {
        console.log('********', newContact);
        return res.redirect('back');
    })
    .catch(err => {
        console.log('error in creating a contact!', err);
        return res.status(500).send("Error creating contact");
    });
});

app.listen(port, function(err){
    if (err){console.log('Error in running the server', err);}
console.log('Yup! My Express Server is running on Port:', port);
})



app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    let phone = req.query.phone

    let contactindex = contactList.findIndex(contact => contact.phone == phone);

    if(contactindex != -1){
        contactList.splice(contactindex, 1);
    }

    return res.redirect('back');
});
