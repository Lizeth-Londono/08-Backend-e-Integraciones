const express = require('express');
const app = express();
const routes = require('./routes'); // Ruta creada

const PORT = 3000;

app.use(express.json()); // Permite el uso de los datos en formato JSON

// Se añade el encabezado de codificación UTF-8
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});


app.use('/api', routes); // Aquí se usa las rutas definidas

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
