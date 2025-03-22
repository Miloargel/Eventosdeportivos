// enrutador principal del servidor
const router= require("express").Router();

router.use("/user", require ("./api/user.routes"));
router.use("/", require ("./api/event.routes"));

module.exports = router;