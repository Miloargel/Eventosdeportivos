//rutas
const router= require("express").Router();
const {createUser, 
        getUsers,
        getUserByName,
        getById,
        registerUser,
        login,
        getProfile,

} = require ('../../controllers/user.controllers');

const checkToken = require("../../middleware/auth");

router.post("/create", createUser); // todo ok
router.get("/list", getUsers); // funciona correctamente
router.get("/listbyname", getUserByName); // ok
router.get("/getbyid/:iduser", getById); // ok


// endpoints para registro de usuario y login

router.post("/register", registerUser);//ok
router.post("/login", login);
router.get("/profile", checkToken, getProfile); // ruta privada o protegida

module.exports = router;
