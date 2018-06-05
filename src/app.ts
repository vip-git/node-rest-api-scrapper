import 'reflect-metadata';
import '@tsed/swagger';

import * as Path from 'path';
import * as dotenv from 'dotenv';
import * as logger from 'morgan';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as proxy from 'express-http-proxy';
import * as compression from 'compression';

dotenv.config({ path: '.env' });

import { ServerLoader, ServerSettings, GlobalAcceptMimesMiddleware } from '@tsed/common';
import { $log } from 'ts-log-debug';
import { MongooseService } from './common/services/shared/mongoose.service';
import { TvMazeService } from './common/services/tvmaze/tvmaze.service';

const rootDir = Path.resolve(__dirname);
@ServerSettings({
    rootDir,
    mount: {
        '/api': `${rootDir}/api/**/**.controller.{ts,js}`
    },
    componentsScan: [
        `${rootDir}/**/**.service.{ts,js}`,
        `${rootDir}/**/**.middleware.{ts,js}`,
        `${rootDir}/**/**.model.{ts,js}`
    ],
    httpPort: process.env.PORT || 3000,
    httpsPort: false,
    acceptMimes: ['application/json'],
    swagger: {
        path: '/api-docs'
    }
})
export class Server extends ServerLoader {
    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    public async $onMountingMiddlewares(): Promise<any> {
        this
            .use(GlobalAcceptMimesMiddleware)
            .use(bodyParser())
            .use(compression())
            .use(express())
            .use('/proxy/', proxy('api.tvmaze.com', {
                proxyReqPathResolver: function(req) {
                    return (req.url === '/' || !req.url || req.url === '')
                            ? require('url').parse(req.url).path + 'welcome-page'
                            : require('url').parse(req.url).path;
                },
                userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
                    return (proxyRes.req.path === '/welcome-page') ? {
                        'data' : 'TvMaze API proxy service'
                    } : TvMazeService.transformProxyData(proxyResData);
                }
            }))
            .use(logger('dev'))
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));

        return null;
    }

    async $onInit(): Promise<any> {
        await MongooseService.connect();
        $log.debug('DB connected');
    }

    public $onReady() {
        $log.info('Server started...');
    }

    public $onServerInitError(err) {
        $log.error(err);
    }
}

