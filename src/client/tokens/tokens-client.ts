import { ClientConfig } from '../client.config';
import axios from 'axios';
import { BaseClient } from '../util/base-client';
import { IGetter } from '../util/getter.interface';
import { ILister } from '../util/lister.interface';
import { IRegister } from '../util/register.interface';
import { Partner } from './partner.class';

/**
 *
 * Raiden sub-client for Tokens.
 */
export class TokensClient extends BaseClient implements IGetter<string>, ILister<string>, IRegister<string> {
    /**
     * Constructor for TokensClient
     * @param config, should contain host url and api version
     */
    constructor(config: ClientConfig) {
        super(config);
    }

    /**
     *
     * Returns the address of the corresponding token network for the given token, if the token is registered.
     * @param address
     */
    async get(address: string): Promise<string> {
        const res = await axios.get(this.getRequestUrl(address));
        return res.data;
    }

    /**
     *
     * Returns a list of addresses of all registered tokens.
     */
    async list(): Promise<string[]> {
        const res = await axios.get(this.listRequestUrl());
        return res.data;
    }

    /**
     *
     * Returns a list of all partners with whom you have non-settled channels for a certain token.
     * @param address
     */
    async listPartners(address: string): Promise<Partner[]> {
        const res = await axios.get(this.partnersRequestUrl(address));
        return res.data.map((pair: any) => new Partner({
            partnerAddress: pair.partner_address,
            channel: pair.channel
        }));
    }

    /**
     *
     * Registers a token. If a token is not registered yet
     * (i.e.: A token network for that token does not exist in
     * the registry), we need to register it by deploying a token
     * network contract for that token.
     * @param address
     */
    async register(address: string): Promise<string> {
        const res = await axios.put(this.getRequestUrl(address));
        return res.data.token_network_address;
    }

    getRequestUrl(address: string): string {
        return this.host + '/api/' + this.version + '/tokens/' + address;
    }

    listRequestUrl(): string {
        return this.host + '/api/' + this.version + '/tokens';
    }

    partnersRequestUrl(address: string): string {
        return this.host + '/api/' + this.version + '/tokens/' + address + '/partners';
    }
}
