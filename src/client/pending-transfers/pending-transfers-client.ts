import { ClientConfig } from '../client.config';
import { BaseClient } from '../util/base-client';
import { ILister } from '../util/lister.interface';
import { Transfer } from './transfer.class';
import axios from 'axios';
import { plainToClass } from 'class-transformer';

/**
 *
 * Raiden sub-client for Pending Transfers.
 */
export class PendingTransfersClient extends BaseClient implements ILister<Transfer> {
    /**
     * Constructor for PendingTransfersClient
     * @param config, should contain host url and api version
     */
    constructor(config: ClientConfig) {
        super(config);
    }

    /**
     *
     * Returns a list of all transfers that have not been completed yet.
     */
    async list(): Promise<Transfer[]> {
        const res = await axios.get(this.listRequestUrl());
        return res.data.map((transfer: any) => plainToClass(Transfer, transfer));
    }

    /**
     * Returns a list of all transfers that have not been completed yet,
     * but limited to pending transfers of the specified token.
     * @param tokenAddress
     */
    async listToken(tokenAddress: string): Promise<Transfer[]> {
        const res = await axios.get(this.listRequestUrl(tokenAddress));
        return res.data.map((transfer: any) => plainToClass(Transfer, transfer));
    }

    /**
     *
     * Returns a list of all transfers that have not been completed yet,
     * but limited to pending transfers of the specified channel.
     * @param tokenAddress
     * @param partnerAddress
     */
    async listChannel(tokenAddress: string, partnerAddress: string): Promise<Transfer[]> {
        const res = await axios.get(this.listRequestUrl(tokenAddress, partnerAddress));
        return res.data.map((transfer: any) => plainToClass(Transfer, transfer));
    }

    /**
     * Url for list request.
     * @param tokenAddress
     * @param partnerAddress
     */
    listRequestUrl(tokenAddress?: string, partnerAddress?: string): string {
        if (tokenAddress) {
            if (partnerAddress) {
                return this.host + '/api/' + this.version + '/pending_transfers/' + tokenAddress + '/' + partnerAddress;
            } else {
                return this.host + '/api/' + this.version + '/pending_transfers/' + tokenAddress;
            }
        }
        return this.host + '/api/' + this.version + '/pending_transfers';
    }
}
