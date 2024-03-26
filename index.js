const { User } = require('./models/index');

async function main() {
  try {
    // Test connection
    await User.sync({ force: true });
    console.log('Connection to MSSQL database successful.');
    
    // Create a new user
    const newUser = await User.create({ name: 'John Doe', email: 'john@example.com' });
    console.log('New user created:', newUser.toJSON());

    // Read all users
    const users = await User.findAll();
    console.log('All users:', users.map(user => user.toJSON()));

    // // Update a user
    // await User.update({ name: 'Jane Doe' }, { where: { id: newUser.id } });
    // console.log('User updated.');

    // // Delete a user
    // await User.destroy({ where: { id: newUser.id } });
    // console.log('User deleted.');

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
