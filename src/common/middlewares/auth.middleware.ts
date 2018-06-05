import { Request } from 'express';
import { IMiddleware, OverrideMiddleware, AuthenticatedMiddleware,
    EndpointInfo, EndpointMetadata, Req
} from 'ts-express-decorators';
import { AuthService } from '../services/shared/auth.service';
import { ApiError, ErrorInfo } from '../utils/error';

@OverrideMiddleware(AuthenticatedMiddleware)
export class AuthMiddleware implements IMiddleware  {
    constructor(
        private authService: AuthService
    ) {

    }

    /**
     * Auth Middleware used to intercept request and
     * check if the request has valid Token.
     *
     * @param endpoint
     * @param request
     */
    async use(@EndpointInfo() endpoint: EndpointMetadata, @Req() request: Request) {
        const token = this.extractHeaderFromRequest(request);
        if (!token) throw new ApiError(ErrorInfo.UNAUTHORIZED);

        (request as any).user = await this.authService.validateToken(token);
    }

    /**
     * Example : Bearer AbCdEf123456
     *
     * @param req
     */
    private extractHeaderFromRequest(req: Request): string {
        const authHeader: any = req.headers.authorization;

        if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
            return authHeader.split(' ')[1];
        }
    }
}