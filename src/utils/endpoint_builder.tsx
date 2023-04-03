import { ApiConstants } from "../constants/api.constants";

export class EndpointBuilder {
    private _persistentParams: string[] = [];
    private _params: string[] = [];
    private _queries: { key: string; value: string }[] = [];
    private _url =
        ApiConstants.protocol +
        "://" +
        ApiConstants.url +
        "/api/" +
        ApiConstants.apiVersion;

    addPersistentParam(param: string) {
        this._persistentParams.push(param);
        return this;
    }

    addParam(param: string) {
        this._params.push(param);
        return this;
    }

    addQuery(key: string, value: string) {
        this._queries.push({ key, value });
        return this;
    }

    build() {
        let url: string = this._url;
        this._persistentParams.forEach((param) => {
            url = url.concat("/", param);
        });
        this._params.forEach((param) => {
            url = url.concat("/", param);
        });
        this._queries.forEach((query, index) => {
            if (index === 0) {
                url = url.concat("?", query.key, "=", query.value);
            } else {
                url = url.concat("&", query.key, "=", query.value);
            }
        });
        this._params = [];
        this._queries = [];
        return url;
    }
}
