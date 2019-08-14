import { Expose } from 'class-transformer';
import { ChannelState } from './channel-state.enum';

export class Channel {
    /**
     *
     * should be an integer containing the identifier of the channel
     */
    @Expose({name: 'channel_identifier'})
    channelIdentifier?: string;

    /**
     *
     * should be a string containing the EIP55-encoded address of the token network the channel is part of
     */
    @Expose({name: 'token_network_identifier'})
    networkIdentifier?: string;

    /**
     *
     * should be a string containing the EIP55-encoded address of the partner with whom we have opened a channel
     */
    @Expose({name: 'partner_address'})
    partnerAddress?: string;

    /**
     *
     * should be a string containing the EIP55-encoded address of the token we are trading in the channel
     */
    @Expose({name: 'token_address'})
    tokenAddress?: string;

    /**
     *
     * should be an integer of the amount of the token_address token we have available for payments.
     */
    @Expose({name: 'balance'})
    balance?: number;

    /**
     *
     * should be an integer of the amount of the token_address token we have deposited into the contract for this channel
     */
    @Expose({name: 'total_deposit'})
    totalDeposit?: number;

    /**
     *
     * should be the current state of the channel represented by a string. Possible value are:
     * - 'opened': The channel is open and tokens are tradeable
     * - 'closed': The channel has been closed by a participant
     * - 'settled': The channel has been closed by a participant and also settled
     */
    @Expose({name: 'state'})
    state?: ChannelState;

    /**
     *
     * The number of blocks that are required to be mined from the time that close() is called
     * until the channel can be settled with a call to settle()
     */
    @Expose({name: 'settle_timeout'})
    settleTimeout?: number;

    /**
     *
     * The maximum number of blocks allowed between the setting of
     * a hashlock and the revealing of the related secret
     */
    @Expose({name: 'reveal_timeout'})
    revealTimeout?: number;

    /**
     * Constructor for Channel.
     * @param channel, partial instance of Channel
     */
    constructor(channel: Partial<Channel>) {
        Object.assign(this, channel);
    }
}
