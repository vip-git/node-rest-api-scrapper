import { inject, Done } from 'ts-express-decorators/testing';
import { InjectorService } from '@tsed/common';

export function getInjectionService(ctx: Function): Promise<InjectorService> {
    return new Promise((resolve) => {
        inject([InjectorService, Done], (injectionService: InjectorService) => {
            resolve(injectionService);
        })(ctx);
    });
}