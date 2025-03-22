const router= require("express").Router();
const {add, 
    updateEvento,
    deleteEvento,
    getAll,
    addUserToEvento,
    SeachEvent,
    nextEvent,
    filterEvent,
    dateEvent
}= require("../../controllers/events.controllers");


router.post("/api/events", add);
router.put("/api/events/:eventId", updateEvento);
router.delete("/api/delete/:eventId", deleteEvento);
router.get("/api/events/:eventId", SeachEvent);
router.get("/api/events", getAll);
router.put("/updateuser", addUserToEvento);

//endpoints consulta avanzada de eventos

router.get("/api/events/upcoming", nextEvent);
router.get("/api/events?type=", filterEvent);
router.get("/api/events/date?from=", dateEvent);
module.exports = router;
