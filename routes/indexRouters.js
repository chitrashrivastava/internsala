const express  = require("express")
const router = express.Router();
const {homepage,studentsignup,studentsignin,studentsignout ,studentsendmail} = require("../controllers/indexContoller");
const { isAuthticated } = require("../midddlewares/auth");

// GET 
router.get("/",isAuthticated,homepage);

// post
router.post("/student",isAuthticated,homepage)

// middleware route or call back k bich me lagya jata h

// POST/STUDENT/SIGNUP
router.post("/student/signup", studentsignup);
// POST/STUDENT/SIGNIN
router.post("/student/signin", studentsignin);
// GET/STUDENT/SIGNOUT
router.get("/student/signout", isAuthticated,studentsignout);
// POST/STUDENT/SEND-MAIL
router.post("/student/send-mail",  studentsendmail);



module.exports = router;

