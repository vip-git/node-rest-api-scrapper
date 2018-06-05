import { ApiError, ErrorInfo } from './index';

export class UnexpectedError extends ApiError {
    constructor() {
        super(ErrorInfo.GENERAL_ERROR);
    }
}