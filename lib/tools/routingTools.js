"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successfulBody = exports.failedBody = void 0;
const failedBody = (result) => ({ ok: false, result });
exports.failedBody = failedBody;
const successfulBody = (result) => ({ ok: true, result });
exports.successfulBody = successfulBody;
/*export const userProtectedRoutes = () => {
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
}*/
//# sourceMappingURL=routingTools.js.map