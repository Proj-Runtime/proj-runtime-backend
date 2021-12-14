/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/

var express = require('express');
var router = express.Router();
let passport = require('passport');

let incidentController = require('../controllers/incident');
let Incident = require('../models/incident');

/* //helper function for guard purposes
function requireAuth(req, res, next) 
{
  //check if the user is logged in
  if(!req.isAuthenticated())
  {
    return res.redirect('/login');
  }
  next();
}; */

/* Router for lists Incident function */
router.get('/list', incidentController.incidentList);
// router.get('/get-item/:id', incidentController.incidentByID, incidentController.getItem);
/* router.get('/list', requireAuth, incidentController.incidentList); */


/* Routers for edit functions */
router.put('/edit/:id', passport.authenticate('jwt', { session: false }), incidentController.processEditPage);
/* router.get('/edit/:id', requireAuth, incidentController.displayEditPage);
 router.post('/edit/:id', requireAuth, incidentController.processEditPage); */


/* Routers for audit functions */
// router.get('/get-item/:id', incidentController.incidentByID, incidentController.getItem);
// router.get('/audit/:id', passport.authenticate('jwt', { session: false }), incidentController.displayAudit);
/* router.get('/audit/:id', requireAuth, incidentController.displayAudit); */


/* Router for Delete function */
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), incidentController.performDelete);
/* router.get('/delete/:id', requireAuth, incidentController.performDelete); */


/* Routers for Add functions */
router.post('/add', passport.authenticate('jwt', { session: false }), incidentController.processAddPage);
/* router.get('/add', requireAuth, incidentController.displayAddPage);
   router.post('/add', requireAuth, incidentController.processAddPage); */


module.exports = router;