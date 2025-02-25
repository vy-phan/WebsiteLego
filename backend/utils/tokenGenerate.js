import jwt from 'jsonwebtoken';

const tokenGenerate = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 ngày
        sameSite: 'strict'
    });

    return token;
};

export default tokenGenerate;