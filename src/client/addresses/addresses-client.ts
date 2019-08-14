import { ClientConfig } from '../client.config';
import { BaseClient } from '../util/base-client';
import { IGetter } from '../util/getter.interface';
import axios from 'axios';

/**
 *
 * Raiden sub-client for Addresses.
 */
export class AddressesClient extends BaseClient implements IGetter<string> {

    /**
     * Constructor for AddressesClient
     * @param config, should contain host url and api version
     */
    constructor(config: ClientConfig) {
        super(config);
    }

    /**
     * Query your address. When raiden starts, you choose an ethereum address which will also be your raiden address
     * @return address.
     */
    async get(): Promise<string> {
        const res = await axios.get(this.getRequestUrl());
        return res.data.our_address;
    }

    /**
     * @return Url for get request.
     */
    getRequestUrl(): string {
        return this.host + '/api/' + this.version + '/address';
    }

}
