const jwt = require('jsonwebtoken');
const { fn } = require('sequelize');
module.exports = function(role) {
    return function(req , res , next ) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                 return res.status(401).json({message:"Не авторизован"})
            }
            const decoded =  jwt.verify(token , process.env.SECRET_KEY)
            if(deocded.role != role){
                return res.status(401).json({message:"Не авторизован"})
            }
            req.user = decoded
            next()
        }   catch (e) {
            res.status(401).json({message: "Вы не авторизованы"})
        }
    };
}









