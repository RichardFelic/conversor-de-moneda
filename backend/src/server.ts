import app from './app';
import { connectDB } from './config/database';

const PORT = process.env.PORT ;

// Conectar a la base de datos
connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});
