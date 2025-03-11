const express = require('express');
const DoctorRouter = express.Router();
const {getcolleges,handlelogin,givehomedet,deleteapp,getpatients,addreport,sendotp,handleforget,resetp,getslotsdoc,adddoc,modifyleaves} = require('../controllers/doctor')
DoctorRouter.get('/getcolleges' , getcolleges);
DoctorRouter.post('/dlogin',handlelogin)
DoctorRouter.post('/gethome',givehomedet)
DoctorRouter.post('/dltapp',deleteapp)
DoctorRouter.post('/getpatients',getpatients)
DoctorRouter.post('/postreport',addreport)
DoctorRouter.post('/sendotp',sendotp)
DoctorRouter.post('/handleforget',handleforget)
DoctorRouter.post('/resetpassword',resetp)
DoctorRouter.post('/getslotsdoc',getslotsdoc)
DoctorRouter.post('/adddoc',adddoc)
DoctorRouter.post('/modifyleaves' ,  modifyleaves);
module.exports = DoctorRouter;