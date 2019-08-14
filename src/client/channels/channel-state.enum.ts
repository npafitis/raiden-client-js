/**
 * Enumeration representing Channel state.
 * - 'opened': The channel is open and tokens are tradeable
 * - 'closed': The channel has been closed by a participant
 * - 'settled': The channel has been closed by a participant and also settled.
 */
export enum ChannelState {
    /**
     * 'opened': The channel is open and tokens are tradeable
     */
    CLOSED = 'closed',
    /**
     * 'closed': The channel has been closed by a participant
     */
    OPENED = 'opened',
    /**
     * 'settled': The channel has been closed by a participant and also settled.
     */
    SETTLED = 'settled'
}
