const {Router} = require('express');
const bcrypt = require('bcryptjs'); 
const {check, validationResult} = require('express-validator');
const User = require('../models/User'); //faily modeley s bolshoy bukvy
const jwt = require('jsonwebtoken');
const config = require('config');
// /api/auth/register
const router = Router();
router.post('/register', 
[
 //validation
    check('email', 'incorrect email').isEmail(),
    check('password', 'min lenght of password is 6 symbols').isLength({min:6})
],
async (req,res) => {  //Отправка данных на сервер 
try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'incorrect email or password'
        });
    }

    const {email, password} = req.body; //poluchaem s frontenda

    const candidate = await User.findOne({email}); //poisk email v bd
    if (candidate) {
        return res.status(400).json({message:'user name already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 12); // hash passward
    const user = new User ({email, password: hashedPassword});
    await user.save();

    res.status(201).json({message:'account created'});

}
catch(e)
{
    res.status(500).json({message:'smthng wrong try again'});
}
});


router.post('/login', 
[
 check('email', 'write email adress').normalizeEmail().isEmail(),
 check('password', 'write password').exists()
],
async (req,res) => {  //Отправка данных на сервер 
try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'incorrect email or password'
        });
    }

    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(400).json({message: 'user name didnt find'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({message: 'wrong password or user name, try again'});
    }

    //jwt tocken for autorization
    const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expireIn: '1h'}
        //зашифрованные данные 
    );

    res.json({token, userId: user.id});

}
catch(e)
{
    res.status(500).json({message:'smthng wrong try again'});
}
});




module.exports = router;