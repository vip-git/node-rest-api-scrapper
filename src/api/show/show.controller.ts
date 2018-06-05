import { Request } from 'express';
import { Controller, Get, PathParams, QueryParams, Authenticated, Required, Req } from 'ts-express-decorators';
import { Returns } from 'ts-express-decorators/lib/swagger';
import { ShowModel } from './show.model';
import { TvMazeService } from '../../common/services/tvmaze/tvmaze.service';

@Controller('/shows')
@Authenticated()
export class ShowController {
    constructor(
        private showService: TvMazeService
    ) {

    }

    /**
     *
     * @param id
     * @returns {null}
     */
    @Get('/:id([0-9]+$)')
    @Returns(ShowModel)
    async getShow(@Required() @PathParams('id') id: string): Promise<ShowModel> {
        return await this.showService.getShowById(id);
    }

    /**
     *
     * @param request
     * @param queryParams
     * @returns {null}
     */
    @Get('/')
    async getShows(@Req() req: Request, @QueryParams() QueryParams: Object): Promise<string> {
        return await this.showService.getShows(QueryParams);
    }

    /**
     *
     * @param request
     * @param id
     * @param queryParams
     * @returns {null}
     */
    @Get('/:id([0-9]{1,})/cast')
    async getShowsCast(@Req() req: Request, @Required() @PathParams('id') id: string, @QueryParams() QueryParams: Object): Promise<any> {
        return await this.showService.getShowsCast(id, QueryParams);
    }
}