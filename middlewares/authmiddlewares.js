const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const db = require('../util/database')


const protect = asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const decode = await jwt.verify(token,process.env.SECRET_KEY)
            const [requestUser] = await db.execute('SELECT _id,name,email,isAdmin FROM users WHERE _id=?',[decode.id])
            req.user = requestUser[0]
            next()
        }catch(err){
            res.status(401)
            throw new Error("Not authorized, token failed.")
        }
    }
    if(!token){
        res.status(401)
        throw new Error("NOt authorized, No token.")
    }
    
})

const admin = asyncHandler(async(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error("Not authorize as a admin.")
    }
})

module.exports = {
    protect,
    admin,
}