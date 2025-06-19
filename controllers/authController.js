const User = require('../model/user')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');

const getRegister = (req,res) =>{
    console.log('Got Signup');
}


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT,{
        expiresIn : '30d'
    })
}

const postRegister = async (req,res) => {
    const {name,email,password} = req.body;
    if(password.length < 8){
            res.status(400).json('Minimum 8 characters');
            return;
    }
    try{
        const hash = await bcrypt.hash(password,12);
        const userData = await User.create({name,email,password:hash});
        const token = createToken(userData._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

        res.status(200).json({userData});
    }
    catch (error){
        console.log(error);
          if(error.code === 11000){
            // console.log(error);
            res.status(400).json('Already Registered')
          }
          if (error.name === 'ValidationError') {
            // const errors = {};
            // Object.values(error.errors).forEach(({ properties }) => {
            //     errors[properties.path] = properties.message;
            // });
            console.log('Validation Errors:');
            return res.status(400).json('Invalid Email');
        }
  }
}

const postLogin = async (req,res) => {
    const {email,password} = req.body;

    try {
        const creds = await User.findOne({email});
        if (creds) {
            const auth = await bcrypt.compare(password, creds.password);
            if (auth) {
                const token = createToken(creds._id);
                res.status(200).json({ token, user: creds });
                return;
            }
            throw new Error('Incorrect Password');
        }
        throw new Error('Incorrect Email');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const logout = (req,res) => {
    res.cookie('jwt','',{maxAge : 1});
    res.status(200).json("Log Out Successful")
}

const verify = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};


module.exports = {
    getRegister,
    postRegister,
    postLogin,
    logout,
    verify
}