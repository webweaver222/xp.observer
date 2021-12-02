
import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/keys'
import { Flix } from '../services/flix'
import { AuthenticationService } from '../services/authenticationService'
import { toObjectId } from './string'
export const failedBody = (result?: any) => ({ ok: false, result })
export const successfulBody = (result?: any) => ({ ok: true, result })


export const userProtectedRoutes = () => {
    const ProtectedRoutes = express.Router()
    ProtectedRoutes.use((req: any, res: any, next: any) => {
        const authorizationHeader = req.headers['authorization']
        if(authorizationHeader) {
            const ip: string = req.headers['x-forwarded-for'] || req.connection.remoteAddress
            const token: any = req.headers['authorization'].split(' ')[1]
            if (token) {
                jwt.verify(token, SECRET_KEY, async (err: any, decoded: any) => {
                    if (err) {
                        return res.json(failedBody('invalid token'))
                    } else {
                        const organizationId = toObjectId(decoded.organizationId)
                        const userId = toObjectId(decoded._id)
                        req.ipAddress = ip
                        req.organization = await new Flix().getOrganizationById(organizationId)
                        req.user = await new AuthenticationService().getUserById(userId)
                        req.flix = new Flix(req.user, req.organization, ip)
                        next()
                    }
                })
            } else res.send(failedBody('missing token'))
        } else res.send(failedBody('missing token'))

        
    })
    return ProtectedRoutes
}
