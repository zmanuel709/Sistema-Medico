const Role = require('../models/role');
const User = require('../models/Users');

const bcrypt = require('bcryptjs');

createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "Paciente" }).save(),
      new Role({ name: "Medico" }).save(),
      new Role({ name: "Administrador" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

createAdmin = async () => {
  // check for an existing admin user
  const user = await User.findOne({ email: "admin@localhost" });
  // get roles _id
  const roles = await Role.find({ name: { $in: ["Administrador", "Medico"] } });

  if (!user) {
    // create a new admin user
    await User.create({
      username: "admin",
      email: "admin@localhost",
      password: await bcrypt.hash("admin", 10),
      roles: roles.map((role) => role._id),
    });
    console.log('Admin User Created!')
  }
};

module.exports = createRoles, createAdmin;