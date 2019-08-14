import { Expose } from 'class-transformer';

export class JoinConfig {
    /**
     *
     * Amount of funding you want to put into the network.
     */
    @Expose({name: 'funds'})
    funds: number;

    /**
     *
     * Number of channels to open proactively.
     */
    @Expose({name: 'initial_channel_target'})
    initialChannelTarget: number;

    /**
     *
     * Fraction of funds that will be used to join
     * channels opened by other participants.
     */
    @Expose({name: 'joinable_funds_target'})
    joinableFundsTarget: number;
}
