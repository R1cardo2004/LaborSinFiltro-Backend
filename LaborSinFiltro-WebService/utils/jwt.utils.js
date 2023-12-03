const tools = {} 
const {SignJWT, jwtVerify} = require('jose')

const secret = new TextEncoder().encode(process.env.SECRET)
const expTime = process.env.TOKEN_EXP_TIME || "30d";

tools.creatToken = async (id) =>{
    return await new SignJWT()
        .setProtectedHeader({ alg: "HS256"})
        .setSubject(id)
        .setExpirationTime(expTime)
        .setIssuedAt()
        .sign(secret)

}

tools.verifyToken = async (token) =>{
    try {
        const {payload} = (await jwtVerify(
            token, 
            secret
        ))
        return payload
    } catch (error) {
        return false   
    }
}

module.exports = tools;