const jwt = require('jsonwebtoken');
const getJwt =(userId)=>{
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    return token
}
module.exports=getJwt