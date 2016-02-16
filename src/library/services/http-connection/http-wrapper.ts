/// <reference path="./../../../../typings/tsd.d.ts" />

import * as http from "http";
import * as https from "https";
import * as urlParser from "url";

import {HttpRequestInterface} from "./http-request-interface";

export class HttpWrapper implements HttpRequestInterface {
    public get(url: string): Promise<any> {

        let protocol = urlParser.parse(url).protocol;

        let request = protocol === "http" ? http : https;

        return new Promise<any>((resolve, reject) => {
            request.get(url, (res) => {
                let chunks = [];

                res.on("data", function(chunk){
                    chunks.push(chunk);
                });

                res.on("end", () => {
                    let data  = Buffer.concat(chunks);

                    if (typeof resolve === "function") {
                        resolve(data);
                    }
                });

            }).on("error", (e) => {
                if (typeof reject === "function") {
                    reject(e);
                }
            });
        });
    }
}
