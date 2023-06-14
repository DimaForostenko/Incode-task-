const express = require('express');
const mongoose = require("mongoose")
const authRouter = require('./authRouter')
const PORT =process.env.PORT || 5000

const app = express();
app.use(express.json())
app.use('/auth',authRouter)

const start =async()=>{
  try{
    await mongoose.connect(`mongodb+srv://forostenkochampion:260491Forostenko@bdforadmin.dlhxiye.mongodb.net/Incode`)
    app.listen(PORT,()=>console.log(`server started on port ${PORT}`))
  }catch{

  }
};

start()
// Перелік користувачів
// const users = [];


// class User {
//   constructor(id, name, role, managerId) {
//     this.id = id;
//     this.name = name;
//     this.role = role;
//     this.managerId = managerId;
//   }
// }

// // Реєстрація користувача
// app.post('/users', (req, res) => {
//   const { name, role, managerId } = req.body;
//   const id = users.length + 1;
//   const newUser = new User(id, name, role, managerId);
//   users.push(newUser);

//   if (role === 'admin') {
//     // Перевірка, що адміністратор може бути тільки один
//     const existingAdmin = users.find(user => user.role === 'admin');
//     if (existingAdmin) {
//       return res.status(400).json({ error: 'Admin already exists' });
//     }
//   } else if (role === 'boss') {
//     // Перевірка, що у боса є принаймні один підлеглий
//     const existingUser = users.find(user => user.id === managerId);
//     if (!existingUser || existingUser.role !== 'boss') {
//       return res.status(400).json({ error: 'Invalid manager ID' });
//     }
//   }

//   res.status(201).json(newUser);
// });

// // Аутентифікація користувача
// app.post('/login', (req, res) => {
//   const { name, role } = req.body;
//   const user = users.find(user => user.name === name && user.role === role);

//   if (!user) {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }

//   res.status(200).json(user);
// });

// // Отримання списку користувачів залежно від ролі
// app.get('/users', (req, res) => {
//   const { name, role } = req.query;

//   if (role === 'admin') {
//     res.status(200).json(users);
//   } else if (role === 'boss') {
//     const user = users.find(user => user.name === name && user.role === 'boss');
//     if (!user) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const subordinateUsers = users.filter(user => user.managerId === user.id);
//     res.status(200).json(subordinateUsers);
//   } else if (role === 'user') {
//     const user = users.find(user => user.name === name && user.role === 'user');
//     if (!user) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     res.status(200).json([user]);
//   } else {
//     res.status(400).json({ error: 'Invalid role' });
//   }
// });