const gestionCtrl = {};
const Especialidad = require('../models/especialidades'); 
const Paciente = require('../models/pacientes');
const Empleado = require('../models/empleados');
const User = require('../models/Users')
const Role = require('../models/role')
const Cita = require('../models/citas');
const Acceso = require('../models/transacciones');
const { create } = require('handlebars');

//funciones de las especialidades

gestionCtrl.renderRep = async (req, res) => {
    const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
          roleMedico=true;
        } else{
            roleMedico=false;
        }
      }

      const user1 = await User.findById(req.user.id);
      const roles1 = await Role.find({ _id: { $in: user1.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles1[i].name === "Administrador") {
          roleAdm=true;
        } else{
            roleAdm=false;
        }
      }

      const user2 = await User.findById(req.user.id);
      const roles2 = await Role.find({ _id: { $in: user2.roles } });
  
      for (let i = 0; i < roles2.length; i++) {
        if (roles2[i].name === "Paciente") {
          rolePac=true;
        } else{
            rolePac=false;
        }
      }
    res.render('gestion/reportes', {rolePac, roleMedico, roleAdm});
};


gestionCtrl.renderPer = async (req, res) => {
    const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
          roleMedico=true;
        } else{
            roleMedico=false;
        }
      }

      const user1 = await User.findById(req.user.id);
      const roles1 = await Role.find({ _id: { $in: user1.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles1[i].name === "Administrador") {
          roleAdm=true;
        } else{
            roleAdm=false;
        }
      }

      const user2 = await User.findById(req.user.id);
      const roles2 = await Role.find({ _id: { $in: user2.roles } });
  
      for (let i = 0; i < roles2.length; i++) {
        if (roles2[i].name === "Paciente") {
          rolePac=true;
        } else{
            rolePac=false;
        }
      }
    res.render('users/perfil', {rolePac, roleMedico, roleAdm});
};

gestionCtrl.renderTra = async (req, res) => {
    const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
          roleMedico=true;
        } else{
            roleMedico=false;
        }
      }

      const user1 = await User.findById(req.user.id);
      const roles1 = await Role.find({ _id: { $in: user1.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles1[i].name === "Administrador") {
          roleAdm=true;
        } else{
            roleAdm=false;
        }
      }

      const user2 = await User.findById(req.user.id);
      const roles2 = await Role.find({ _id: { $in: user2.roles } });
  
      for (let i = 0; i < roles2.length; i++) {
        if (roles2[i].name === "Paciente") {
          rolePac=true;
        } else{
            rolePac=false;
        }
      }
    res.render('gestion/bitTrans', {rolePac, roleMedico, roleAdm});
};

gestionCtrl.renderAce = async (req, res) => {
  const acceso = await Acceso.find().sort({createdAt: 'desc'});

    const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
          roleMedico=true;
        } else{
            roleMedico=false;
        }
      }

      const user1 = await User.findById(req.user.id);
      const roles1 = await Role.find({ _id: { $in: user1.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles1[i].name === "Administrador") {
          roleAdm=true;
        } else{
            roleAdm=false;
        }
      }

      const user2 = await User.findById(req.user.id);
      const roles2 = await Role.find({ _id: { $in: user2.roles } });
  
      for (let i = 0; i < roles2.length; i++) {
        if (roles2[i].name === "Paciente") {
          rolePac=true;
        } else{
            rolePac=false;
        }
      }
    res.render('gestion/bitAcess', {rolePac, roleMedico, roleAdm, acceso});
};

gestionCtrl.renderBit = async (req, res) => {
    const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
          roleMedico=true;
        } else{
            roleMedico=false;
        }
      }

      const user1 = await User.findById(req.user.id);
      const roles1 = await Role.find({ _id: { $in: user1.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles1[i].name === "Administrador") {
          roleAdm=true;
        } else{
            roleAdm=false;
        }
      }

      const user2 = await User.findById(req.user.id);
      const roles2 = await Role.find({ _id: { $in: user2.roles } });
  
      for (let i = 0; i < roles2.length; i++) {
        if (roles2[i].name === "Paciente") {
          rolePac=true;
        } else{
            rolePac=false;
        }
      }
    res.render('gestion/billetera', {rolePac, roleMedico, roleAdm});
};

gestionCtrl.renderRec = async (req, res) => {
    const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
          roleMedico=true;
        } else{
            roleMedico=false;
        }
      }

      const user1 = await User.findById(req.user.id);
      const roles1 = await Role.find({ _id: { $in: user1.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles1[i].name === "Administrador") {
          roleAdm=true;
        } else{
            roleAdm=false;
        }
      }

      const user2 = await User.findById(req.user.id);
      const roles2 = await Role.find({ _id: { $in: user2.roles } });
  
      for (let i = 0; i < roles2.length; i++) {
        if (roles2[i].name === "Paciente") {
          rolePac=true;
        } else{
            rolePac=false;
        }
      }

   
    res.render('forms/confRecarga', {rolePac, roleMedico, roleAdm, });
};

gestionCtrl.renderVerRec = async (req, res) => {
    const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
          roleMedico=true;
        } else{
            roleMedico=false;
        }
      }

      const user1 = await User.findById(req.user.id);
      const roles1 = await Role.find({ _id: { $in: user1.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles1[i].name === "Administrador") {
          roleAdm=true;
        } else{
            roleAdm=false;
        }
      }

      const user2 = await User.findById(req.user.id);
      const roles2 = await Role.find({ _id: { $in: user2.roles } });
  
      for (let i = 0; i < roles2.length; i++) {
        if (roles2[i].name === "Paciente") {
          rolePac=true;
        } else{
            rolePac=false;
        }
      }


     


    res.render('forms/verRecarga', {rolePac, roleMedico, roleAdm, });
};

gestionCtrl.renderFormCita = async (req, res) => {
    const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
          roleMedico=true;
        } else{
            roleMedico=false;
        }
      }

      const user1 = await User.findById(req.user.id);
      const roles1 = await Role.find({ _id: { $in: user1.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles1[i].name === "Administrador") {
          roleAdm=true;
        } else{
            roleAdm=false;
        }
      }

      const user2 = await User.findById(req.user.id);
      const roles2 = await Role.find({ _id: { $in: user2.roles } });
  
      for (let i = 0; i < roles2.length; i++) {
        if (roles2[i].name === "Paciente") {
          rolePac=true;
        } else{
            rolePac=false;
        }
      }
    res.render('forms/formCita', {rolePac, roleMedico, roleAdm});
};

gestionCtrl.renderConfCita = async (req, res) => {
    const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
          roleMedico=true;
        } else{
            roleMedico=false;
        }
      }

      const user1 = await User.findById(req.user.id);
      const roles1 = await Role.find({ _id: { $in: user1.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles1[i].name === "Administrador") {
          roleAdm=true;
        } else{
            roleAdm=false;
        }
      }

      const user2 = await User.findById(req.user.id);
      const roles2 = await Role.find({ _id: { $in: user2.roles } });
  
      for (let i = 0; i < roles2.length; i++) {
        if (roles2[i].name === "Paciente") {
          rolePac=true;
        } else{
            rolePac=false;
        }
      }
    res.render('forms/verCita', {rolePac, roleMedico, roleAdm});
};

gestionCtrl.renderVerCita = async (req, res) => {
    const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
          roleMedico=true;
        } else{
            roleMedico=false;
        }
      }

      const user1 = await User.findById(req.user.id);
      const roles1 = await Role.find({ _id: { $in: user1.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles1[i].name === "Administrador") {
          roleAdm=true;
        } else{
            roleAdm=false;
        }
      }

      const user2 = await User.findById(req.user.id);
      const roles2 = await Role.find({ _id: { $in: user2.roles } });
  
      for (let i = 0; i < roles2.length; i++) {
        if (roles2[i].name === "Paciente") {
          rolePac=true;
        } else{
            rolePac=false;
        }
      }
    res.render('forms/confCita', {rolePac, roleMedico, roleAdm});
};

gestionCtrl.renderEsp = async (req, res) => {
    const especialidad = await Especialidad.find().sort({createdAt: 'desc'});

    const user = await User.findById(req.user.id);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "Medico") {
        roleMedico=true;
      } else{
          roleMedico=false;
      }
    }

    const user1 = await User.findById(req.user.id);
    const roles1 = await Role.find({ _id: { $in: user1.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles1[i].name === "Administrador") {
        roleAdm=true;
      } else{
          roleAdm=false;
      }
    }

    const user2 = await User.findById(req.user.id);
    const roles2 = await Role.find({ _id: { $in: user2.roles } });

    for (let i = 0; i < roles2.length; i++) {
      if (roles2[i].name === "Paciente") {
        rolePac=true;
      } else{
          rolePac=false;
      }
    }

    res.render('gestion/especialidades', { especialidad, rolePac, roleMedico, roleAdm });
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


gestionCtrl.renderPac = async (req, res ) => {

    const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
          roleMedico=true;
        } else{
            roleMedico=false;
        }
      }

      const user1 = await User.findById(req.user.id);
      const roles1 = await Role.find({ _id: { $in: user1.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles1[i].name === "Administrador") {
          roleAdm=true;
        } else{
            roleAdm=false;
        }
      }

      const user2 = await User.findById(req.user.id);
      const roles2 = await Role.find({ _id: { $in: user2.roles } });
  
      for (let i = 0; i < roles2.length; i++) {
        if (roles2[i].name === "Paciente") {
          rolePac=true;
        } else{
            rolePac=false;
        }
      }
      
      
    const paciente = await Paciente.find().sort({createdAt: 'desc'});
    res.render('gestion/pacientes', { paciente, rolePac, roleMedico, roleAdm });
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
    const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
          roleMedico=true;
        } else{
            roleMedico=false;
        }
      }

      const user1 = await User.findById(req.user.id);
      const roles1 = await Role.find({ _id: { $in: user1.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles1[i].name === "Administrador") {
          roleAdm=true;
        } else{
            roleAdm=false;
        }
      }

      const user2 = await User.findById(req.user.id);
      const roles2 = await Role.find({ _id: { $in: user2.roles } });
  
      for (let i = 0; i < roles2.length; i++) {
        if (roles2[i].name === "Paciente") {
          rolePac=true;
        } else{
            rolePac=false;
        }
      }
    res.render('gestion/horarios', {rolePac, roleMedico, roleAdm});
};

// mostrar dias
gestionCtrl.renderDia = async (req, res) => {
    const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
          roleMedico=true;
        } else{
            roleMedico=false;
        }
      }

      const user1 = await User.findById(req.user.id);
      const roles1 = await Role.find({ _id: { $in: user1.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles1[i].name === "Administrador") {
          roleAdm=true;
        } else{
            roleAdm=false;
        }
      }

      const user2 = await User.findById(req.user.id);
      const roles2 = await Role.find({ _id: { $in: user2.roles } });
  
      for (let i = 0; i < roles2.length; i++) {
        if (roles2[i].name === "Paciente") {
          rolePac=true;
        } else{
            rolePac=false;
        }
      }
    res.render('gestion/dias', {rolePac, roleMedico, roleAdm});
};

// mostrar doctores
gestionCtrl.renderEmp = async (req, res) => {
    const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
          roleMedico=true;
        } else{
            roleMedico=false;
        }
      }

      const user1 = await User.findById(req.user.id);
      const roles1 = await Role.find({ _id: { $in: user1.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles1[i].name === "Administrador") {
          roleAdm=true;
        } else{
            roleAdm=false;
        }
      }

      const user2 = await User.findById(req.user.id);
      const roles2 = await Role.find({ _id: { $in: user2.roles } });
  
      for (let i = 0; i < roles2.length; i++) {
        if (roles2[i].name === "Paciente") {
          rolePac=true;
        } else{
            rolePac=false;
        }
      }
    const empleado = await Empleado.find().sort({createdAt: 'desc'});
    res.render('gestion/doctores', { empleado, rolePac, roleMedico, roleAdm });
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
    const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
          roleMedico=true;
        } else{
            roleMedico=false;
        }
      }

      const user1 = await User.findById(req.user.id);
      const roles1 = await Role.find({ _id: { $in: user1.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles1[i].name === "Administrador") {
          roleAdm=true;
        } else{
            roleAdm=false;
        }
      }

      const user2 = await User.findById(req.user.id);
      const roles2 = await Role.find({ _id: { $in: user2.roles } });
  
      for (let i = 0; i < roles2.length; i++) {
        if (roles2[i].name === "Paciente") {
          rolePac=true;
        } else{
            rolePac=false;
        }
      }
    const cita = await Cita.find().sort({createdAt: 'desc'});
    let Medicos = await Empleado.find({'especialidad': 'odontologia' }); 
    res.render('gestion/citas', { cita, Medicos, rolePac, roleMedico, roleAdm });
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


gestionCtrl.isModerator = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Require Medico Role!" });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  };
  
  gestionCtrl.isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Administrador") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Require Administrador Role!" });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  };

  
  gestionCtrl.registraracces = async (req, res, next) => {
    const { email, name, roles } = req.user;

    const newAcc = new Acceso({ email, name, roles });
    newAcc.user = req.user.id;
    await newAcc.save();
    return next();
};

  gestionCtrl.comprobarRole = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Medico") {
            console.log("pasando por la funcion");
          return roleMedico=true;
        }
      }
      console.log("pasando por la funcion");
      return roleMedico=false;

    } catch {
        console.log("pasando por la funcion");
      return roleMedico=false;
    }
  };


module.exports = gestionCtrl;