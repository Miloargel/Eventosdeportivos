const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Asigna la URL de conexión directamente a la variable DB_URI
    const DB_URI = 'mongodb+srv://camilodarguelles:XpfuauAwVp57IPXw@cluster0.zui15.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    
    // Conectar a la base de datos
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB conectado con éxito');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error.message);
    process.exit(1); // Termina el proceso si hay un error
  }
};

module.exports = connectDB;