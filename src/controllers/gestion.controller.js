const gestionCtrl = {};
const Especialidad = require('../models/especialidades'); 
const Paciente = require('../models/pacientes');
const Empleado = require('../models/empleados');
const Cita = require('../models/citas');
const Habitante = require('../models/habitantes');
const Familia = require('../models/familias');
const Casa = require('../models/casas');
const { model } = require('mongoose');
const req = require('express/lib/request');


//tabla de los habitantes
gestionCtrl.renderHab = async (req, res) => {
    const habitante = await Habitante.find()
    .populate('familia')
    .sort({createdAt: 'desc'});
    res.render('gestion/habitantes', { habitante});
};





//crear nuevo habitante
gestionCtrl.createNewHab = async (req, res) => {
    const { nombres, cedula, fn, codigoC, sexo } = req.body;
    
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
    res.redirect('/addDias')
};





//render habitantes sin familia
gestionCtrl.renderFam = async (req, res) => {
    const habitantesSinFamilia = await Habitante.find({familia: null}).sort({createdAt: 'desc'});
    res.render('gestion/citas', {habitantesSinFamilia});
};





//crear nueva familia
gestionCtrl.createNewFamilia = async (req, res) => {
    const { jefe, miembros, casa } = req.body;

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
      res.redirect('/Cita');
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
      res.redirect('/addDias'); // Redirecciona a la página principal en caso de error
    }
};  






//ver habitante en especifico
gestionCtrl.verHab = async (req, res) => {
    const habitante = await Habitante.findById(req.params.id).populate('familia').populate('familia.habitantes');

    if (!habitante.familia) {

        req.flash('error_msg', 'error: el habitante no se puede mostrar sin familia registrada');
        return res.redirect('/addPaciente');
    }

    const habitantesId = habitante.familia.habitantes || []; //si no hay familiares envia un arreglo vacio

    const familiares = await Habitante.find({ _id: { $in: habitantesId } });

    res.render('ver/habitante', { habitante, familiares });
};




//ver familia
gestionCtrl.verFam = async (req, res) => {

    const codigoFamilia = req.params.id;


    const familia = await Familia.findOne({ codigo: codigoFamilia }).populate('habitantes');

    // console.log(familia);

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
    res.redirect('/addPaciente')
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

    // const totalCasas = await Familia.distinct('casa').countDocuments();
    
    const totalM = await Habitante.countDocuments({sexo: 'M'});

    const totalF = await Habitante.countDocuments({sexo: 'F'});

    res.render('ver/reportes', {totalHab, totalFam, totalCasas, totalM, totalF});
};











gestionCtrl.updatePac = async (req, res) =>  {
    const { cedula, nombres, apellidos, direccion, telefono } = req.body;
    await Paciente.findByIdAndUpdate(req.params.id, { cedula, nombres, apellidos, direccion, telefono });
    req.flash('success_msg', 'Un paciente ha sido Actualizado.');    
    res.redirect('/addPaciente');
};

gestionCtrl.deletePac = async (req, res) =>  {
    await Paciente.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Un Paciente ha sido Eliminado.');
    res.redirect('/addPaciente')
};

//funciones de las especialidades

gestionCtrl.renderEsp = async (req, res) => {
    const especialidad = await Especialidad.find().sort({createdAt: 'desc'});
    res.render('gestion/especialidades', { especialidad });
};

gestionCtrl.createNewEsp = async (req, res) => {
    const {title, description} = req.body;
    const newEsp = new Especialidad({title , description});
    newEsp.user = req.user.id;
    await newEsp.save();
    req.flash('success_msg', 'Una Especialidad ha sido agregada');
    res.redirect('/addEsp')
};

gestionCtrl.espToggleDone = async (req, res, next) => {
    const espc = await Especialidad.findById(req.params.id);
    espc.completed = !espc.completed;
    await espc.save();
    res.redirect("/addEsp");
  };

gestionCtrl.updateEsp = async (req, res) =>  {
    console.log(req.body);
    const { title, description } = req.body;
    await Especialidad.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Una Especialidad ha sido Actualizada.');    
    res.redirect('/addEsp');
};

gestionCtrl.deleteEsp = async (req, res) =>  {
    await Especialidad.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Una Especialidad ha sido Eliminada.');
    res.redirect('/addEsp')
};

// mostrar horarios
gestionCtrl.renderHrc = async (req, res) => {
    res.render('gestion/horarios');
};

// mostrar dias
gestionCtrl.renderDia = async (req, res) => {
    res.render('gestion/dias');
};

// mostrar doctores
gestionCtrl.renderEmp = async (req, res) => {
    const empleado = await Empleado.find().sort({createdAt: 'desc'});
    res.render('gestion/doctores', { empleado });
};

gestionCtrl.createNewEmp = async (req, res) => {
    const { cedula, nombres, apellidos, especialidad, telefono } = req.body;
    const newEmp = new Empleado({cedula, nombres, apellidos, especialidad, telefono });
    newEmp.user = req.user.id;
    await newEmp.save();
    req.flash('success_msg', 'Un empleado ha sido agregado');
    res.redirect('/addEmpleado')
};

gestionCtrl.updateEmp = async (req, res) =>  {
    const { cedula, nombres, apellidos, especialidad, telefono } = req.body;
    await Empleado.findByIdAndUpdate(req.params.id, { cedula, nombres, apellidos, especialidad, telefono });
    req.flash('success_msg', 'Un Empleado ha sido Actualizado.');    
    res.redirect('/addEmpleado');
};

gestionCtrl.deleteEmp = async (req, res) =>  {
    await Empleado.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Un Empleado ha sido Eliminado.');
    res.redirect('/addEmpleado')
};

// mostrar agregar editar y eliminar citas 
gestionCtrl.renderCit = async (req, res) => {
    const cita = await Cita.find().sort({createdAt: 'desc'});
    let Medicos = await Empleado.find({'especialidad': 'odontologia' }); 
    res.render('gestion/citas', { cita, Medicos });
};

gestionCtrl.createNewCit = async (req, res) => {
    const { cedula, medico, turno, fecha } = req.body;
    const newCit = new Cita({cedula, medico, turno, fecha});
    newCit.user = req.user.id;
    await newCit.save();
    req.flash('success_msg', 'Una Cita ha sido agregada...');
    res.redirect('/Cita')
};

gestionCtrl.updateCit = async (req, res) =>  {
    const { cedula, medico, turno, fecha } = req.body;
    await Cita.findByIdAndUpdate(req.params.id, { cedula, medico, turno, fecha });
    req.flash('success_msg', 'Una Cita ha sido Actualizada...');    
    res.redirect('/Cita');
};

gestionCtrl.deleteCit = async (req, res) =>  {
    await Cita.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Una Cita ha sido Eliminada...');
    res.redirect('/Cita')
};

module.exports = gestionCtrl;
