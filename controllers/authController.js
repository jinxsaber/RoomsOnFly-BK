const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create JWT
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT, {
        expiresIn: '30d'
    });
};

// GET /register (for testing)
const getRegister = (req, res) => {
    console.log('Got Signup');
    res.send('Register route');
};

// POST /register
const postRegister = async (req, res) => {
    const { name, email, password } = req.body;

    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }

    try {
        const hash = await bcrypt.hash(password, 12);
        const user = await User.create({ name, email, password: hash });

        const token = createToken(user._id);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            user: { _id: user._id, name: user.name, email: user.email },
            token
        });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already registered.' });
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid email format.' });
        }

        res.status(500).json({ error: 'Registration failed.' });
    }
};

// POST /login
const postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) throw new Error('Incorrect Email');

        const auth = await bcrypt.compare(password, user.password);

        if (!auth) throw new Error('Incorrect Password');

        const token = createToken(user._id);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            user: { _id: user._id, name: user.name, email: user.email },
            token
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET /logout
const logout = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 1
    });
    res.status(200).json({ message: "Logout successful" });
};

// POST /verify
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
};
