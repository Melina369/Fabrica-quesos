const { application } = require('express');
const paginate = require('express-paginate');
const express = require('express');
const bcryptjs = require("bcryptjs");

// const { authenticate } = require('passport');
const app = express();
const router = express.Router();

const Usuarios = require('../models/usuarios');

const isAuth = (req,res,next)=>{
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/');
    }
}

router.get('/', (req, res, next) => {
    res.render('signin.ejs');
});

router.post("/", async (req, res) => {
    const body = req.body;
    const usuario = await Usuarios.findOne({ cuenta: body.cuenta });
    if (usuario) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.pass, usuario.pass);
      if (validPassword) {
        res.status(200).json({ message: "Valid password" });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  });

// rutas produccion

const Produccion = require('../models/produccion'); //importa el esquema de los datos

router.get('/produccion',isAuth, async (req, res, next) => { //recupera los datos 
    const page = req.query.page;
    const limit = parseInt(req.query.limit);

    try {
        const [ results, itemCount ] = await Promise.all([
            // linea de abajo, 
            Produccion.find({}).limit(limit).skip(req.skip).lean().exec(),
            Produccion.count({})
        ]);

        const pageCount = Math.ceil(itemCount / limit);
        
        res.render('pro-list', {
            produccion: results,
            pageCount,
            itemCount,
            limit,
            pages: paginate.getArrayPages(req)(Number.MAX_SAFE_INTEGER, pageCount, page),
        });
    } catch (err) {
        next(err);
    }
    

});

router.get('/nuevo-registro', isAuth, async (req, res) => { //recupera los datos 
    const produccion= await Produccion.find();
    res.render('produccion', {
        produccion
    });
});

///recibe los elmentos del formulario y los almacena en un formato entendible para la bd
router.post('/add-pro',isAuth, async(req, res)  => {
    const produccion= new Produccion(req.body);
    await produccion.save();
    res.redirect('/produccion'); //redireccionar a la ruta principal que enlista los datos
});



//toma el id de un registro para borrarlo
router.get('/delete-pro/:id',isAuth, async (req, res) => {
    const { id } = req.params; //obetenemos el id del objeto que seleccionamos
    await Produccion.remove({_id: id}); //tomamos el id que nos da el navegador y lo asignamos a la funcion de la bd
    res.redirect('/produccion');
});

//edit get
router.get('/edit-pro/:id',isAuth, async (req, res) => {
    const { id } = req.params;
    const produccion= await Produccion.findById(id);
    res.render('pro-edit', {
        produccion
    });
});

//edit post
router.post('/edit-pro/:id',isAuth, async (req, res) => {
    const { id } = req.params;
    await Produccion.update({_id: id}, req.body);
    res.redirect('/produccion');
})


// stock routes
const Stock = require('../models/stock'); //importa el esquema de los datos


router.get('/stock',isAuth, async (req, res, next) => { //recupera los datos 
    const page = req.query.page;
    const limit = parseInt(req.query.limit);

    try {
        const [ results, itemCount ] = await Promise.all([
            // linea de abajo, 
            Stock.find({}).limit(limit).skip(req.skip).lean().exec(),
            Stock.count({})
        ]);

        const pageCount = Math.ceil(itemCount / limit);
        
        res.render('stock-list', {
            stock: results,
            pageCount,
            itemCount,
            limit,
            pages: paginate.getArrayPages(req)(Number.MAX_SAFE_INTEGER, pageCount, page),
        });
    } catch (err) {
        next(err);
    }
});

router.get('/nuevo-registro-stock',isAuth, async (req, res) => { //recupera los datos 
    const stock= await Stock.find();
    res.render('stock', {
        stock
    });
});

///recibe los elmentos del formulario y los almacena en un formato entendible para la bd
router.post('/add-stock',isAuth, async(req, res)  => {
    const stock= new Stock(req.body);
    await stock.save();
    res.redirect('/stock'); //redireccionar a la ruta principal que enlista los datos
});

//toma el id de un registro para borrarlo
router.get('/delete-stock/:id',isAuth, async (req, res) => {
    const { id } = req.params; //obetenemos el id del objeto que seleccionamos
    await Stock.remove({_id: id}); //tomamos el id que nos da el navegador y lo asignamos a la funcion de la bd
    res.redirect('/stock');
});

//edit get
router.get('/edit-stock/:id',isAuth, async (req, res) => {
    const { id } = req.params;
    const stock= await Stock.findById(id);
    res.render('stock-edit', {
        stock
    });
});

//edit post
router.post('/edit-stock/:id', isAuth,async (req, res) => {
    const { id } = req.params;
    await Stock.update({_id: id}, req.body);
    res.redirect('/stock');
})

// curado
const Curado = require('../models/curado'); //importa el esquema de los datos


router.get('/curado',isAuth, async (req, res, next) => { //recupera los datos 
    const page = req.query.page;
    const limit = parseInt(req.query.limit);

    try {
        const [ results, itemCount ] = await Promise.all([
            // linea de abajo, 
            Curado.find({}).limit(limit).skip(req.skip).lean().exec(),
            Curado.count({})
        ]);

        const pageCount = Math.ceil(itemCount / limit);
        
        res.render('cur-list', {
            curado: results,
            pageCount,
            itemCount,
            limit,
            pages: paginate.getArrayPages(req)(Number.MAX_SAFE_INTEGER, pageCount, page),
        });
    } catch (err) {
        next(err);
    }
});

router.get('/nuevo-registro-cur',isAuth,async (req, res) => { //recupera los datos 
    const curado= await Curado.find();
    res.render('curado', {
        curado
    });
});

///recibe los elmentos del formulario y los almacena en un formato entendible para la bd
router.post('/add-cur',isAuth, async(req, res)  => {
    const curado= new Curado(req.body);
    await curado.save();
    res.redirect('/curado'); //redireccionar a la ruta principal que enlista los datos
});

//toma el id de un registro para borrarlo
router.get('/delete-cur/:id',isAuth, async (req, res) => {
    const { id } = req.params; //obetenemos el id del objeto que seleccionamos
    await Curado.remove({_id: id}); //tomamos el id que nos da el navegador y lo asignamos a la funcion de la bd
    res.redirect('/curado');
});

//edit get
router.get('/edit-cur/:id',isAuth, async (req, res) => {
    const { id } = req.params;
    const curado= await Curado.findById(id);
    res.render('cur-edit', {
        curado
    });
});

//edit post
router.post('/edit-cur/:id',isAuth, async (req, res) => {
    const { id } = req.params;
    await Curado.update({_id: id}, req.body);
    res.redirect('/curado');
})



router.get('/logout',isAuth, (req, res, next) => {
    req.session.destroy((error)=>{
        if(error) throw error;
        res.redirect('/');
    })
});


// admin router

const Mantenimiento = require('../models/mantenimiento'); //importa el esquema de los datos
//const Computadoras = require('../models/computadoras');


router.get('/admin', isAuth,async (req, res, next) => { //recupera los datos 
    const page = req.query.page;
    const limit = parseInt(req.query.limit);

    try {
        const [ results, itemCount ] = await Promise.all([
            // linea de abajo, 
            Mantenimiento.find({}).limit(limit).skip(req.skip).lean().exec(),
            Mantenimiento.count({})
        ]);

        const pageCount = Math.ceil(itemCount / limit);
        
        res.render('adm-list', {
            mantenimiento: results,
            pageCount,
            itemCount,
            limit,
            pages: paginate.getArrayPages(req)(Number.MAX_SAFE_INTEGER, pageCount, page),
        });
    } catch (err) {
        next(err);
    }
});

router.get('/nuevo-registro-adm',isAuth, async (req, res) => { //recupera los datos 
    const mantenimiento= await Mantenimiento.find();
    res.render('administracion', {
        mantenimiento
    });
});

///recibe los elmentos del formulario y los almacena en un formato entendible para la bd
router.post('/add-adm',isAuth, async(req, res)  => {
    const mantenimiento= new Mantenimiento(req.body);
    await mantenimiento.save();
    res.redirect('/admin'); //redireccionar a la ruta principal que enlista los datos
});

//botón 
router.get('/turn-adm/:id',isAuth, async (req, res) => {
    const { id } = req.params;
    const mantenimiento= await Mantenimiento.findById(id);
    //cambiar el valor del status
    mantenimiento.solucion= !mantenimiento.solucion;
    await mantenimiento.save();
    res.redirect('/admin');
});

//toma el id de un registro para borrarlo
router.get('/delete-adm/:id',isAuth, async (req, res) => {
    const { id } = req.params; //obetenemos el id del objeto que seleccionamos
    await Mantenimiento.remove({_id: id}); //tomamos el id que nos da el navegador y lo asignamos a la funcion de la bd
    res.redirect('/admin');
});

//edit get
router.get('/edit-adm/:id',isAuth, async (req, res) => {
    const { id } = req.params;
    const mantenimiento= await Mantenimiento.findById(id);
    res.render('adm-edit', {
        mantenimiento
    });
});

//edit post
router.post('/edit-adm/:id',isAuth, async (req, res) => {
    const { id } = req.params;
    await Mantenimiento.update({_id: id}, req.body);
    res.redirect('/admin');
})

module.exports = {indexRoutes: router, paginate};