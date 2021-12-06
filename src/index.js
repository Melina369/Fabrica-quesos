const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const { indexRoutes } = require('./routes/index');
const { paginate } = require('./routes/index');
const morgan = require('morgan');
const passport = require('passport');
const session =  require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const bcryptjs = require("bcryptjs");

// Inicializaciones
const app = express();
app.use("/auth", indexRoutes);
app.use(express.json())
app.use(paginate.middleware(10, 50));

mongoose.connect('mongodb://localhost/fabrica2', {})
    //promesas. algo que ocurre segun lo que pase
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));


//configuraciones
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// 
// const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

// 
const store = new MongoDBSession({
    uri: 'mongodb://localhost/fabrica2',
    collection: "mySessions",

})

app.use(session({
    secret: 'key that will sign cookie',
    resave: false,
    saveUninitialized: false,
    store: store
}));

const isAuth = (req,res,next)=>{
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/');
    }
}

const usuarios = require('../src/models/usuarios');

app.post('/signin', async (req,res)=>{
    const name = req.body.email;
    const password = req.body.password;
    const vista = req.body.view;


    const user = await usuarios.findOne({cuenta:name});
    if(!user){
        res.redirect('/');
    }

    const passhash = user.pass;
    // const p = await usuarios.findOne({pass:password});
    if(! await bcryptjs.compare(password,passhash)){
        res.redirect('/');
    }

    if(user.view == vista){
        req.session.isAuth = true;
        if(vista=="1"){
            res.redirect('/produccion');
            req.session.v = 1;
        }
        if(vista=="2"){
            res.redirect('/curado');
            req.session.v = 2;
         }
        if(vista=="3"){
            res.redirect('/admin');
            req.session.v = 3;
        }
    }
})


// Routes
app.use('/', indexRoutes);

// empezando el servidor
app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'));
});

