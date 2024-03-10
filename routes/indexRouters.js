const express  = require("express")
const router = express.Router();
const {homepage,studentsignup,studentsignin,studentsignout} = require("../controllers/indexContoller");
const { isAuthticated } = require("../midddlewares/auth");

// GET 
router.get("/",isAuthticated,homepage);

// post
router.post("/student",isAuthticated,homepage)

// POST/STUDENT/SIGNUP
router.post("/student/signup", studentsignup);


router.post("/student/signin", studentsignin);

router.get("/student/signout", studentsignout);


module.exports = router;

