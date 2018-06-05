// Library
import fetch from 'node-fetch';
import * as _ from 'lodash';
import { Inject, Service } from '@tsed/common';

@Service()
export class TvMazeService {
    static transformProxyData(proxyResData) {
        const data = JSON.parse(proxyResData.toString('utf8'));
        if (data.length) {
            data.map(function(values) {
                values._links.self.href = values._links.self.href.replace(
                    'api.tvmaze.com', 'localhost:3000/proxy');
                values._links.previousepisode.href = values._links.previousepisode.href.replace(
                    'api.tvmaze.com', 'localhost:3000/proxy');
                return values;
            });
        } else {
            data._links.self.href = data._links.self.href.replace(
                'api.tvmaze.com', 'localhost:3000/proxy');
            if (data && data._links && data._links.previousepisode && data._links.previousepisode.href) {
                data._links.previousepisode.href = data._links.previousepisode.href.replace(
                    'api.tvmaze.com', 'localhost:3000/proxy');
            }
        }

        return JSON.stringify(data);
    }

    async getShows(queryParams) {
        const queryString = Object.keys(queryParams).map(function(key) {
            return key + '=' + queryParams[key];
        }).join('&');
        return await fetch('http://api.tvmaze.com/shows?' + queryString)
                        .then(res => res.json())
                        .then(json => _.chain(json)
                                        .map(function(values: any) {
                                            values._links.self.href = _.replace(values._links.self.href,
                                                'api.tvmaze.com', 'localhost:3000/api');
                                            values._links.previousepisode.href = _.replace(values._links.previousepisode.href,
                                                'api.tvmaze.com', 'localhost:3000/proxy');
                                            return values;
                                        })
                                        .take(queryParams.limit || json.length));
    }

    async getShowById(id) {
        return await fetch('http://api.tvmaze.com/shows/' + id)
                        .then(res => res.json())
                        .then(json => json);
    }

    async getShowsCast(id, queryParams) {
        return await fetch('http://api.tvmaze.com/shows/' + id + '/cast')
                        .then(res => res.json())
                        .then(json => _.chain(_.orderBy(json, ['person.birthday'], ['asc']))
                                        .take(queryParams.limit || json.length));
    }
}