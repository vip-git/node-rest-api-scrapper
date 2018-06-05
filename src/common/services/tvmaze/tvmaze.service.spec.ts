import { UserRepositoryToken } from '../../../api/show/show.model';
import { getInjectionService } from '../../utils/tests/injectors';
import { TvMazeService } from './tvmaze.service';

describe('UserService', () => {
    it('should fetch user by id', async () => {
        const inject = await getInjectionService(this);
        const locals = new Map();
        const userData = { name: 'test' };
        const findSpy = jest.fn().mockReturnValue(Promise.resolve(userData));
        locals.set(UserRepositoryToken, {
            findById: findSpy
        });

        const service = inject.invoke<TvMazeService>(TvMazeService, locals);
        const foundUser = await service.getShowById('123');

        expect(foundUser).toEqual(userData);
        expect(findSpy).toHaveBeenCalledTimes(1);
        expect(findSpy.mock.calls[0][0]).toBe('123');
    });
});