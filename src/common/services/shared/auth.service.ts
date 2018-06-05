import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import { Inject, Service } from 'ts-express-decorators';

const DAY = 60000 * 60 * 24;
export const TOKEN_EXP = DAY * 7;

@Service()
export class AuthService {

    /**
     * Used to fetch user based on its token.
     *
     * @param {string} token
     * @returns {Promise<User>}
     */
    async validateToken(token: string) {
       return {
           userId : 1
       };
    }

}