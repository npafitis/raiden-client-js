import { ClientConfig } from '../client.config';

/**
 * Base implementation for client
 */
export abstract class BaseClient {
    protected readonly host: string;
    protected readonly version: string;

    protected constructor(config: ClientConfig) {
        this.host = config.host;
        this.version = config.apiVersion;
    }
}
