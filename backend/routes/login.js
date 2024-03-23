var express = require('express');
var router = express.Router();


router.post('/', async function(req, res) {
    // const user =  await User.findOne({email: req.body.email});
    // if(!user){
    //     res.status(404).json({ message: "Incorrect email", isSuccess: false});
    // }    
    // else{
    //     const validPassword = await bcrypt.compare(req.body.password, user.password);
    //     if(!validPassword){
    //         res.status(401).json({ message: "Incorrect password", isSuccess: false});
    //     }
    //     else{
    //         req.session.email = user.email;
    //         res.status(200).json({ message: "success", user_info:  user, isSuccess: false});
    //     }
    // }
});

module.exports = router;