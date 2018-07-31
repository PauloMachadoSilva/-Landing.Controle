import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import * as DIGITAL_SERVICE_GET_LIST from './../../../../app-config/mock/DIGITAL_SERVICE_GET_LIST.json';
import * as QUEST_SERVICE_GET_QUEST_LIST from './../../../../app-config/mock/QUEST_SERVICE_GET_QUEST_LIST.json';

import { HttpService } from './http.service';
import { APIConfigService } from './../config/apiConfig.service';

@Injectable()
export class HttpAPIMockService {
    private _headers: HttpHeaders;

    public _mockList: any;

    constructor(
        private _apiConfig: APIConfigService,
        private _http: HttpService
    ) {
        this._mockList = {
            DIGITAL_SERVICE_GET_LIST,
            QUEST_SERVICE_GET_QUEST_LIST
        };
    }

    public async get<TResponse>(key: string, params = {}): Promise<TResponse> {
        return <Promise<TResponse>>this.request(key);
    }

    public async post<TResponse>(key: string, params = {}): Promise<TResponse> {
        return <Promise<TResponse>>this.request(key);
    }

    public async put<TResponse>(key: string, params = {}): Promise<TResponse> {
        return <Promise<TResponse>>this.request(key);
    }

    private async request<TResponse>(key: string): Promise<TResponse> {
        return new Promise<TResponse>((resolve, reject) => {
            console.log('......... DADOS MOCKADOS .........', key, this._mockList[key]);
            resolve(this._mockList[key]);
        });
    }
}
