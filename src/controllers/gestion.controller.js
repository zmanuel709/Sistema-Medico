const gestionCtrl = {};
const Especialidad = require('../models/especialidades'); 
const Paciente = require('../models/pacientes');
const Empleado = require('../models/empleados');
const Cita = require('../models/citas')

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

//funcines de los pacientes

gestionCtrl.renderPac = async (req, res) => {
    const paciente = await Paciente.find().sort({createdAt: 'desc'});
    res.render('gestion/pacientes', { paciente });
};

gestionCtrl.createNewPac = async (req, res) => {
    const { cedula, nombres, apellidos, direccion, telefono } = req.body;
    const newPac = new Paciente({cedula, nombres, apellidos, direccion, telefono});
    newPac.user = req.user.id;
    await newPac.save();
    req.flash('success_msg', 'Un paciente ha sido agregado');
    res.redirect('/addPaciente')
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
