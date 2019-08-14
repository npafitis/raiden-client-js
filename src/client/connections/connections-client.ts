import { ClientConfig } from '../client.config';
import { BaseClient } from '../util/base-client';
import { ILister } from '../util/lister.interface';
import { Connection } from './connection.class';
import axios from 'axios';
import { JoinConfig } from './join.config';
import { plainToClass } from 'class-transformer';
import { Channel } from '../channels';

/**
 *
 * Raiden sub-client for Connections
 */
export class ConnectionsClient extends BaseClient implements ILister<Connection> {

    /**
     * Constructor for ConnectionsClient
     * @param config, should contain host url and api version
     */
    constructor(config: ClientConfig) {
        super(config);
    }

    /**
     * Query details of all joined token networks.
     * The request will return a JSON object where each key is a token address for which you have open channels.
     */
    async list(): Promise<Connection[]> {
        const res = await axios.get(this.listRequestUrl());
        return Object.keys(res.data).map<Connection>((key: string) => {
            const connection: Connection = plainToClass(Connection, res.data[key] as object);
            connection.tokenAddress = key;
            return connection;
        });
    }

    /**
     *
     * Automatically join a token network.
     * The request will only return once all blockchain
     * calls for opening and/or depositing to a channel
     * have completed.
     * @param tokenAddress
     * @param joinConfig
     */
    joinTokenNetwork(tokenAddress: string, joinConfig: Partial<JoinConfig>): Promise<any> {
        return axios.put(this.joinRequestUrl(tokenAddress), joinConfig);
    }

    /**
     *
     * Leave a token network. The request will only return once
     * all blockchain calls for closing/settling a channel have completed.
     * @param tokenAddress
     */
    async leaveTokenNetwork(tokenAddress: string): Promise<string[]> {
        const res = await axios.delete(this.joinRequestUrl(tokenAddress));
        return res.data;
    }

    /**
     *
     * Url for list request.
     */
    listRequestUrl(): string {
        return this.host + '/api/' + this.version + '/connections';
    }

    /**
     * Url for join request
     * @param tokenAddress
     */
    joinRequestUrl(tokenAddress: string): string {
        return this.host + '/api/' + this.version + '/connections/' + tokenAddress;
    }
}
