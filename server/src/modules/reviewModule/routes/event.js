const express = require('express');
const {getEvents, getEventById, addEvent, updateEvent, deleteEvent, addEditor, addReviewer,getAllReviewersInEvent ,getEventsByUser ,getEventIdByName,updateReviewerStatus,UpdateTemplate} = require('../controller/event');
const protectRoute =require("../../usermanagement/privateroute")
const superAdminRoute=require("../../usermanagement/superadminroute")



const router = express.Router();

router.get('/getAllEvents', getEvents);
router.get('/getReviewerInEvent/:id',getAllReviewersInEvent);
router.get('/getEvents/:id',getEventById);

router.get('/geteventsbyuser',protectRoute, getEventsByUser);
router.get('/:id', getEventById);
router.get('/name/:name',getEventIdByName);
// router.get('/getEditorId/:email',getEditorIdByEmail);
router.patch('/:id', UpdateTemplate);
router.post('/addevent', superAdminRoute, addEvent);
router.post('/addEditor/:id', addEditor);
router.post('/addReviewer/:id', addReviewer);

router.patch('/:id',updateEvent);
router.delete('/:id',superAdminRoute, deleteEvent);
router.post('/updateReviewerStatus/:eventId/:reviewerId', updateReviewerStatus);

module.exports = router;
