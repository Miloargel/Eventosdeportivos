const Eventos = require("../models/event.model");

const add =async(req, res) => {
    try{
    const newEvento = new Eventos(req.body);
    const createdEvento = await newEvento.save();
        res.json(createdEvento);
} catch(error) {
    console.log(error);
    res.json(error);
    };
};

const updateEvento =async(req, res) => {
    const id= req.params.id;
    const evento = req.body;

    try{
        const updatedEvento = await Eventos.findByIdAndUpdate(id, evento, {
            new:true,
        });
        res.json(updatedEvento); 
    } catch (error) {
        res.json(error);
    }
};

const deleteEvento= async (req,res) => {
    try {
        const { id } = req.params; // es la estructura que mas se usa en js
        const deletedEvento = await Eventos.findByIdAndDelete(id);
        res.json(deletedEvento);
    } catch (error) {
        res.json(error);
    }
};

const getAll = async (req, res) => {
try{
    const eventos = await Eventos.find().populate('users','name email');
    res.json(eventos);
}catch ( error) {
    res.json(error);
}
}; 

const addUserToEvento = async(req, res) => {
    try{
        const {idE, idU} = req.body;
        const updatedEvento = await Eventos.findByIdAndUpdate(
            idE,
            { $addToSet: {users:idU} },
            // {$push:{users:idU}}, haciendo esto se podria duplicar
             { new: true }
    );


    if(!updatedEvento){
        return res.json({succes:false,
            message:"no existe el evento indicado",
        });
    }

    res.json(updatedEvento);
}catch(error){}
};
const SeachEvent = async (req, res) => {
    try {
        const { id } = req.params; // Extraer el id de los parámetros de la URL
        const SeachEvents = await Eventos.findById(id); // Buscar el evento por ID

        if (!SeachEvents) {
            return res.status(404).json({ message: "Evento no encontrado" }); // Devolver 404 si no se encuentra el evento
        }

        res.json(SeachEvents); // Enviar el evento encontrado como respuesta
    } catch (error) {
        console.error(error); // Registrar el error en la consola para depuración
        res.status(500).json({ message: "Error interno del servidor", error: error.message }); 
    }
};
const nextEvent = async (req, res) => {
    try {
        const currentDate = new Date();
        console.log("Fecha actual:", currentDate);

        // Filtrar eventos cuya fecha sea mayor o igual que la fecha actual
        const events = await Eventos.find({ date: { $gte: currentDate } })
            .sort({ date: 1 });

        console.log("Eventos encontrados:", events);

        if (events.length === 0) {
            return res.status(404).json({ message: "No hay eventos próximos." });
        }

        // Devolver la lista de eventos próximos
        res.json(events);
    } catch (error) {
        console.error("Error al obtener los eventos:", error); // Detallar el error
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};
const filterEvent = async (req, res) => {
    try {
        // Obtener el tipo de deporte desde los parámetros de consulta (si se proporciona)
        const { type } = req.query;

        // Construir la consulta inicial para eventos futuros
        let query = { date: { $gte: new Date() } };

        // Si se proporciona un tipo de deporte, agregarlo al filtro
        if (type) {
            query.tipoDeDeporte = type;
        }

        // Buscar los eventos con el filtro aplicado y ordenarlos por fecha
        const events = await Eventos.find(query).sort({ date: 1 });

        // Devolver la lista de eventos filtrados y ordenados
        res.json(events);
    } catch (error) {
        console.error(error); // Registrar el error en la consola para depuración
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

const dateEvent = async (req, res) => {
    try {
        // Obtener las fechas 'from' y 'to' desde los parámetros de consulta
        const { from, to } = req.query;

        // Verificar si las fechas son válidas
        if (!from || !to) {
            return res.status(400).json({ message: "Ambas fechas ('from' y 'to') son requeridas." });
        }

        // Convertir las fechas a objetos Date
        const fromDate = new Date(from);
        const toDate = new Date(to);

        // Asegurarse de que las fechas son válidas
        if (isNaN(fromDate) || isNaN(toDate)) {
            return res.status(400).json({ message: "Fechas inválidas proporcionadas." });
        }

        // Consultar los eventos que están dentro del rango de fechas
        const events = await Eventos.find({
            date: {
                $gte: fromDate,  // Mayor o igual que 'from'
                $lte: toDate,    // Menor o igual que 'to'
            }
        }).sort({ date: 1 });  // Ordenar los eventos por fecha de forma ascendente

        // Devolver los eventos dentro del rango de fechas
        res.json(events);

    } catch (error) {
        console.error(error); // Registrar el error en la consola para depuración
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};


module.exports = { add, updateEvento, deleteEvento, getAll, addUserToEvento, SeachEvent, nextEvent, filterEvent, dateEvent };
