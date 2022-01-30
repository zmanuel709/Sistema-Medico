const gestionCtrl = {};
const Especialidad = require('../models/especialidades'); 
const Paciente = require('../models/pacientes');

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
    console.log(req.body);
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

module.exports = gestionCtrl;