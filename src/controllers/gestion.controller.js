const gestionCtrl = {};
const Habitante = require('../models/habitantes');
const Familia = require('../models/familias');
const { model } = require('mongoose');
const req = require('express/lib/request');


//tabla de los habitantes
gestionCtrl.renderHab = async (req, res) => {
    const habitante = await Habitante.find()
    .populate('familia')
    .sort({createdAt: 'desc'});
    res.render('gestion/habitantes', { habitante});
};

// mostrar tabla habitantes 
gestionCtrl.renderHabForm = async (req, res) => {
    res.render('gestion/habForm');
};

 
//editar habitante
gestionCtrl.editHab = async (req, res) => {
    const { nombres, cedula, fn, codigoC, sexo } = req.body;

    //verificar que esten todos los datos
    if (!nombres || !cedula || !fn || !codigoC || !sexo) {
        req.flash('error_msg', 'Faltan Campos obligatorios');
        return res.redirect('/habFom');
    }

    //validar cedula
    const cedulaVeri = req.body.cedula;
    const cedulaRegex = /^\d+$/;
    if (!cedulaRegex.test(cedulaVeri)) {
        req.flash('error_msg', 'el formato de la cedula es invalido');
        return res.redirect('/habFom');
    }

    //validar el formato de la fecha
    const fechaNacimientoVeri = req.body.fn;
    const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!fechaRegex.test(fechaNacimientoVeri)) {
        req.flash('error_msg', 'el formato de la fecha de nacimiento es incorrecto');
        return res.redirect('/habFom') 
    }

    //calcular edad 
    const fechaNacimiento = req.body.fn; //extraer nacimiento
    const fechaActual = new Date(); //extraer fecha
    const partesFechaNacimiento = fechaNacimiento.split('/'); //dividir fecha

    const diaNacimiento = parseInt(partesFechaNacimiento[0], 10);
    const mesNacimiento = parseInt(partesFechaNacimiento[1], 10);
    const anioNacimiento = parseInt(partesFechaNacimiento[2], 10);

    var edad = fechaActual.getFullYear() - anioNacimiento; 

    //verificar si ya cumlio años
    if (
        fechaActual.getMonth() < mesNacimiento - 1 || 
        (fechaActual.getMonth() === mesNacimiento - 1 && fechaActual.getDate() < diaNacimiento)
    ) {
        edad = edad - 1;
    }

    //actualizar lo datos de habitante
    await Habitante.findByIdAndUpdate(req.params.id, { nombres, cedula, fn, codigoC, sexo, edad });
    req.flash('success_msg', 'un habitante a sido actualizado');
    res.redirect('/habitante');
};


//crear nuevo habitante
gestionCtrl.createNewHab = async (req, res) => {
    const { nombres, cedula, fn, codigoC, sexo } = req.body;

    //verificar que esten todos los datos
    if (!nombres || !cedula || !fn || !codigoC || !sexo) {
        req.flash('error_msg', 'Faltan Campos obligatorios');
        return res.redirect('/habFom');
    }

    //validar cedula
    const cedulaVeri = req.body.cedula;
    const cedulaRegex = /^\d+$/;
    if (!cedulaRegex.test(cedulaVeri)) {
        req.flash('error_msg', 'el formato de la cedula es invalido');
        return res.redirect('/habFom');
    }

    //validar el formato de la fecha
    const fechaNacimientoVeri = req.body.fn;
    const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!fechaRegex.test(fechaNacimientoVeri)) {
        req.flash('error_msg', 'el formato de la fecha de nacimiento es incorrecto');
        return res.redirect('/habFom') 
    }
    
    //calcular edad 
    const fechaNacimiento = req.body.fn; //extraer nacimiento
    const fechaActual = new Date(); //extraer fecha
    const partesFechaNacimiento = fechaNacimiento.split('/'); //dividir fecha

    const diaNacimiento = parseInt(partesFechaNacimiento[0], 10);
    const mesNacimiento = parseInt(partesFechaNacimiento[1], 10);
    const anioNacimiento = parseInt(partesFechaNacimiento[2], 10);

    var edad = fechaActual.getFullYear() - anioNacimiento; 

    //verificar si ya cumlio años
    if (
        fechaActual.getMonth() < mesNacimiento - 1 || 
        (fechaActual.getMonth() === mesNacimiento - 1 && fechaActual.getDate() < diaNacimiento)
    ) {
        edad = edad - 1;
    }

    //guardar datos del habitante
    const newHab = new Habitante({nombres, cedula, fn, codigoC, sexo, edad});
    newHab.user = req.user.id;
    await newHab.save();
    req.flash('success_msg', 'Un habitante ha sido agregado');
    res.redirect('/habFom')
};





//render habitantes sin familia
gestionCtrl.renderFam = async (req, res) => {
    const habitantesSinFamilia = await Habitante.find({familia: null}).sort({createdAt: 'desc'});
    res.render('gestion/famForm', {habitantesSinFamilia});
};





//crear nueva familia
gestionCtrl.createNewFamilia = async (req, res) => {
    const { jefe, miembros, casa } = req.body;

    //verificar que esten todos los datos
    if (!jefe || !miembros || !casa) {
        req.flash('error_msg', 'Faltan Campos obligatorios');
        return res.redirect('/famForm');
    }

     // Obtener el número de la última familia registrada
        const lastFamilia = await Familia.findOne({}, {}, { sort: { codigo: -1 } });

     // Generar el nuevo código incrementando en uno el número de la última familia
        let newCodigo = '';
        if (lastFamilia) {
            const lastCode = parseInt(lastFamilia.codigo, 10);
            const newCode = lastCode + 1;
            newCodigo = newCode.toString().padStart(4, '0');
        } else {
            newCodigo = '0001';
        }

    //inicializar miembros como un arreglo 
    const miembrosArray = miembros ? (Array.isArray(miembros) ? miembros : [miembros]) : [];

    //obtener los datos del jefe 
    const datosJefe = await model('Habitante').findById(jefe);

    //verificar si el jefe de familia ya esta en la lista de miembros
    const jefeEnMiembros = miembrosArray.includes(jefe);

    //agregar el jefe de familia a la lista de miembros si no esta presente
    if (!jefeEnMiembros) {
        miembrosArray.push(jefe);
    }
    
      // Crear la nueva familia
      const nuevaFamilia = new Familia({
        nombre: datosJefe.nombres,
        codigo: newCodigo,
        jefe,
        habitantes: miembrosArray,
        casa
      });

      //guardar la nueva familia 
      const familiaGuardada = await nuevaFamilia.save();

      //actualizar la familia en la base de datos
      await Habitante.updateMany({ _id: { $in: miembrosArray }}, {familia: familiaGuardada._id});

      // Redirigir a la página de éxito o a donde corresponda
      req.flash('success_msg', 'La familia se ha creado exitosamente');
      res.redirect('/famForm');
};






//tabla de familias
gestionCtrl.renderFamilias = async (req, res) => {
    try {
      // Obtener todas las familias con sus habitantes
      const familias = await Familia.find().populate('habitantes');
  
      // Calcular el total de habitantes de cada familia
        const familiasConTotalHabitantes = familias.map((familia) => ({
        codigo: familia.codigo,
        nombre: familia.nombre,
        totalHabitantes: familia.habitantes.length,
        casa: familia.casa
      }));
  
      res.render('gestion/familias', { familias: familiasConTotalHabitantes });
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Ocurrió un error al cargar las familias');
      res.redirect('/habFom'); // Redirecciona a la página principal en caso de error
    }
};  






//ver habitante en especifico
gestionCtrl.verHab = async (req, res) => {
    const habitante = await Habitante.findById(req.params.id).populate('familia').populate('familia.habitantes');

    if (!habitante.familia) {

        req.flash('error_msg', 'error: el habitante no se puede mostrar sin familia registrada');
        return res.redirect('/habitante');
    }

    const habitantesId = habitante.familia.habitantes || []; //si no hay familiares envia un arreglo vacio

    const familiares = await Habitante.find({ _id: { $in: habitantesId } });

    res.render('ver/habitante', { habitante, familiares });
};




//ver familia
gestionCtrl.verFam = async (req, res) => {
    const codigoFamilia = req.params.id;
    const familia = await Familia.findOne({ codigo: codigoFamilia }).populate('habitantes');
    res.render('ver/familia', { familia });
};

 


//borrar habitante
gestionCtrl.deleteHab = async (req, res) =>  {
    const habitanteId = req.params.id;

    const familia = await Familia.findOne({ habitantes: habitanteId });

    if (familia) {
        const index = familia.habitantes.indexOf(habitanteId);
        if (index > -1) {
            familia.habitantes.splice(index, 1);
            await familia.save();
        }
    }

    await Habitante.findByIdAndDelete(habitanteId);

    
    req.flash('success_msg', 'Un Habitante ha sido Eliminado.');
    res.redirect('/habitante')
};



// borrar familia 
gestionCtrl.deleteFam = async (req, res) => {
    const familiaId = req.params.id;

    const familia = await Familia.findById(familiaId);
    
    //obtener habitantes
    const habitantes = familia.habitantes;

    const habitantesId = habitantes.map(habitante => habitante.toString());

    await Habitante.updateMany({ _id: { $in: habitantesId } }, { familia: null });

    //eliminar la familia
    await Familia.findByIdAndDelete(familiaId);

    req.flash('success_msg', 'Una Familia ha sido Eliminada.');
    res.redirect('/Familias')
};

//render edit form
gestionCtrl.renderEditHab = async (req, res) => {
    const habitante = await Habitante.findById(req.params.id);
    res.render('gestion/editHab', { habitante });
};







//ver reportes
gestionCtrl.renderReport = async (req, res) =>{
    
    const totalHab = await Habitante.countDocuments();

    const totalFam = await Familia.countDocuments();

    const familias = await Familia.find();

    //total de casas
    const casaUnicas = new Set();
    familias.forEach((familia) => {
        casaUnicas.add(familia.casa);
    });
    const totalCasas = casaUnicas.size;

    const totalM = await Habitante.countDocuments({sexo: 'M'});

    const totalF = await Habitante.countDocuments({sexo: 'F'});

    //calcular numero de niños, adolescentes, adultos y mayores 

    const totalNiños = await Habitante.countDocuments({ edad: { $lt: 12 } });
    const totalAdo = await Habitante.countDocuments({ edad: { $gte: 12, $lte: 18 } });
    const totalAdultos = await Habitante.countDocuments({ edad: { $gte: 18, $lte: 60 } });
    const totalMayores = await Habitante.countDocuments({ edad: { $gt: 60 } });

    res.render('ver/reportes', {
        totalHab,
        totalFam,
        totalCasas,
        totalM,
        totalF,
        totalNiños,
        totalAdo,
        totalAdultos,
        totalMayores
    });
};

module.exports = gestionCtrl;