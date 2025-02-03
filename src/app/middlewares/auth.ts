import jwt from 'jsonwebtoken'
import authconfig from '../../config/auth.json'

class Auth {

    public verifyToken(req, res, next){
        const authHeader = req.headers.authorization
        if (!authHeader) return res.status(401).send({ error: 'No token provided' })

        const parts = authHeader.split(' ')

        if (parts.length !== 2) return res.status(401).send({ error: 'Token error' })
        const [scheme, token] = parts
        if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token malformatted' })
        jwt.verify(token, authconfig.secret, (err, decoded) => {
            if (err) return res.status(401).send({ error: 'Invalid Token' })
            req.user = decoded.usuario;
            req.token = token;
            return next()
        })
    }
}

export default new Auth()