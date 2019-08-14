export class ClientConfig {
    host: string;
    apiVersion: string;

    constructor(host: string, apiVersion: string) {
        this.host = host;
        this.apiVersion = apiVersion;
    }
}