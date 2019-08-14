import { Expose } from 'class-transformer';

/**
 *
 * Class representation for Connection
 */
export class Connection {
    /**
     *
     * Token address of connection
     */
    tokenAddress: string;

    /**
     *
     * Funds from last connect request
     */
    @Expose({name: 'funds'})
    funds: number;

    /**
     *
     * Sum of deposits of all currently open channels
     */
    @Expose({name: 'sum_deposits'})
    sumDeposits: number;

    /**
     *
     * Number of channels currently open for that token
     */
    @Expose({name: 'channels'})
    channels: number;

    /**
     * Constructor for Connection.
     * @param tokenAddress
     * @param connection
     */
    constructor(tokenAddress: string, connection: Partial<Connection>) {
        Object.assign(this, connection);
        this.tokenAddress = tokenAddress;
    }
}
