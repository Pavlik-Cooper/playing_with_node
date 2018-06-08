const exprees = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = exprees();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.get('/test',(req,res)=>{
    console.log('hit');
    res.send('test');
});
// middleware.
// All that's under this middle won't be accessible without calling next() function
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    fs.appendFileSync('log.txt',log + '\n');
    res.render('maintaince');
    // next();
});
app.use(exprees.static(__dirname + '/public'));

// helpers
hbs.registerHelper('getYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    // res.send({
    //     request: 'bad',
    //     haha: [
    //         'ergtb',
    //         'wgbwr'
    //     ]
    // });
    res.render('home',{
        greet: 'Welcome on homepage!'
    });
});
app.get('/about',(req,res)=>{
    res.render('about',{
        greet: 'About page'
    });
});


app.listen(port,()=>{
    console.log(`server up on ${port}`);
});