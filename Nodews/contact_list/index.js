const { name } = require('ejs');
const express = require('express');
const path = require('path');
const { title } = require('process');
const port = 8000;

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


var contactlist = [
    {name:"Arpan",
     phone: "111111111111"
    },
    {
        name: "Tony Stark",
        phone: "123456789"
    }, 
    {
        name: "Coding Ninjas",
        phone: "2316537634"
    }
]
app.get('/', function(req, res){
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
    return res.redirect('/practice');
});

app.listen(port, function(err){
    if (err){console.log('Error in running the server', err);}
console.log('Yup! My Express Server is running on Port:', port);
})