import { ClientConfig } from '../client.config';
import { BaseClient } from '../util/base-client';
import { Channel } from './channel.class';
import axios from 'axios';
import { plainToClass } from 'class-transformer';

/**
 *
 * Raiden sub-client for Channels.
 */
export class ChannelsClient extends BaseClient {
    /**
     * Constructor for ChannelsClient
     * @param config, should contain host url and api version
     */
    constructor(config: ClientConfig) {
        super(config);
    }

    /**
     *
     * This request is used to increase the deposit in it.
     * @param tokenAddress, The token we want to be used in the channel.
     * @param partnerAddress, The partner we want to open a channel with.
     * @param deposit, Total amount of tokens to be deposited to the channel
     */
    async increaseDeposit(tokenAddress: string, partnerAddress: string, deposit: number): Promise<Channel> {
        const res = await axios.patch(this.depositRequestUrl(tokenAddress, partnerAddress), {
            total_deposit: deposit
        });
        return plainToClass(Channel, res.data) as Channel;
    }

    /**
     * This request is used to close a channel.
     * @param tokenAddress, The token we want to be used in the channel.
     * @param partnerAddress, The partner we want to open a channel with.
     */
    async close(tokenAddress: string, partnerAddress: string): Promise<Channel> {
        const res = await axios.patch(
            this.closeRequestUrl(tokenAddress, partnerAddress),
            {state: 'closed'}
        );
        return plainToClass(Channel, res.data) as Channel;
    }

    /**
     *
     * Opens (i. e. creates) a channel.
     * @param tokenAddress, The token we want to be used in the channel.
     * @param partnerAddress, The partner we want to open a channel with.
     * @param deposit, Total amount of tokens to be deposited to the channel
     * @param settleTimeout, The amount of blocks that the settle timeout should have.
     */
    async open(tokenAddress: string, partnerAddress: string, deposit: number, settleTimeout: number): Promise<Channel> {
        const res = await axios.put(this.openRequestUrl(), {
            partner_address: partnerAddress,
            token_address: tokenAddress,
            total_deposit: deposit,
            settle_timeout: settleTimeout
        });
        return plainToClass(Channel, res.data) as Channel;
    }

    /**
     * Url for close request.
     * @param tokenAddress
     * @param partnerAddress
     */
    closeRequestUrl(tokenAddress: string, partnerAddress: string): string {
        return this.host + '/api/' + this.version + '/channels/' + tokenAddress + '/' + partnerAddress;
    }

    /**
     * Url for open request
     */
    openRequestUrl(): string {
        return this.host + '/api/' + this.version + '/channels';
    }

    /**
     * Url for deposit request.
     * @param tokenAddress
     * @param partnerAddress
     */
    depositRequestUrl(tokenAddress: string, partnerAddress: string): string {
        return this.host + '/api/' + this.version + '/channels/' + tokenAddress + '/' + partnerAddress;
    }
}
