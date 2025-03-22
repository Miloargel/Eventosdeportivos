const bcrypt = require ('bcrypt');
const { createToken } = require ('../../utils/jwt');
const Users = require('../models/user.model');

const createUser = async (req, res) => {
    try{
        const data =req.body // obtengo los datos que me envia el cliente
        const newUser = new Users(data);
        const createdUser = await newUser.save();
        res.json({
            status:"success",
            data:createdUser,
        });
    } catch(error){
        console.log(error);
        res.json(error);
    }
};

const getUsers = async (req, res) => {
    try {
        const listUsers = await Users.find(); // obtenemos todos los usuarios desde la base de datos
        res.json({
            status: "success",
            list: listUsers,
        });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};

const getUserByName =async(req,res) =>{
    try{
        const {nameuser} = req.query;
        // buscar que el nombre contenga string hay que trabajar con expresiones regulartes REGEX
        const users= await Users.find({
            name: new RegExp(nameuser,"i"),
        });
        res.json(users);

    } catch (error) {
        console.log(error);
        res.json(error);
    }
};

const getById =async(req, res) =>{
    try{
        const {iduser} = req.params;
        const data = await Users.findById(iduser);
        res.json(data);
    }catch (error) {
        console.log(error);
        res.json(error);
}};

const registerUser = async(req, res)=> {
    try{
        let { username, name, email, password } = req.body;
        const userDB = await Users.find({ email:email });

        if(userDB.length === 0) {
            password = bcrypt.hashSync(password, 10); // encripta la contrasena
            const newUser = new Users({
                username,  
                name,
                email,
                password,
            });
            const createdU = await newUser.save(); // agrega el await para que nos devuelva. Funcion asyncrona
            res.json({
                success:true,
                usuarioCreado: createdU,
            });
        }else{
            res.json({
                success: false,
                message:'no se creo el usuario',
            });
        }

    } catch(error){
        console.log(error);
        res.json(error);
    }
};

const login = async(req, res) =>{
    try{
        //recibo el uusuario y contrasena del cliente body
        const {email, password} = req.body;
        //verificar que el email existe
        const userDB = await Users.findOne({ email });
        if(!userDB){
            return res.json({success: false, message:"Usuario no existe"});
        }
        // SI EXISTE EL EMAIL
            // comparar la contrasena que me has enviado con la guardada en la DB
        const isSame = bcrypt.compareSync(password, userDB.password);
        // NO coinciden las contrasenas --> devuelvo msj de error
        if (!isSame) {
            return res.json({ success:false, message: 'contrasena incorrecta'});
        }
        //coinciden las contrasenas---> se crea el token
        const token = createToken(userDB);
        res.json({ success:true, token: token });
        //NO EXISTE EL EMAIL--> devuelvo msj de error

    } catch (error){ 
        console.log("Error en login:", error);  // Añadir esto para depurar
        res.status(500).json({ success: false, message: "Hubo un error al procesar tu solicitud" });
    }
    };

const getProfile = async(req, res) => {
    try {
        res.json({ success:true, data: req.user });
    } catch (error) {
        res.json({ success: false, message: error });
    }
};

module.exports = { createUser,
    getUsers, 
    getUserByName, 
    getById, 
    registerUser,
    login,
    getProfile,
};