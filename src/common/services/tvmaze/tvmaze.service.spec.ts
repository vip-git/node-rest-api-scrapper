import { ParseService } from "@tsed/common";
import {inject} from "@tsed/testing";
import { UserRepositoryToken } from '../../../api/show/show.model';
import { TvMazeService } from './tvmaze.service';

describe('UserService', () => {
    let service;

    beforeEach(inject([TvMazeService], (_tvmazeService_: TvMazeService) => {
        service = _tvmazeService_;
    }));

    it('should fetch show by id', async () => {
        const foundShow = await service.getShowById('123');
        expect(foundShow).toHaveProperty('id');
        expect(foundShow).toHaveProperty('url');
        expect(foundShow).toHaveProperty('name');
        expect(foundShow).toHaveProperty('type');
        expect(foundShow).toHaveProperty('language');
        expect(foundShow).toHaveProperty('genres');
        expect(foundShow).toHaveProperty('status');
        expect(foundShow).toHaveProperty('runtime');
        expect(foundShow).toHaveProperty('premiered');
        expect(foundShow).toHaveProperty('officialSite');
        expect(foundShow).toHaveProperty('schedule');
        expect(foundShow).toHaveProperty('rating');
        expect(foundShow).toHaveProperty('weight');
        expect(foundShow).toHaveProperty('network');
        expect(foundShow).toHaveProperty('webChannel');
        expect(foundShow).toHaveProperty('externals');
        expect(foundShow).toHaveProperty('image');
        expect(foundShow).toHaveProperty('summary');
        expect(foundShow).toHaveProperty('updated');
        expect(foundShow).toHaveProperty('_links');
    });
});
