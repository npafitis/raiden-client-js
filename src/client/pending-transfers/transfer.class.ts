import { Expose } from 'class-transformer';
import { Role } from './role.enum';

export class Transfer {

    /**
     * Identifier for channel
     */
    @Expose({name: 'channel_identifier'})
    channelIdentifier: string;

    /**
     * In a payment the initiator is the raiden node which starts the payment
     */
    @Expose({name: 'initiator'})
    initiator: string;

    /**
     * The locked amount is the total amount of tokens one participant of a payment channel
     * has locked in pending transfers towards his counterparty
     */
    @Expose({name: 'locked_amount'})
    lockedAmount: string;

    /**
     * Payment's identifier
     */
    @Expose({name: 'payment_identifier'})
    paymentIdentifier: string;

    /**
     * Either initiator, mediator or target
     */
    @Expose({name: 'role'})
    role: Role;

    /**
     * Target's address
     */
    @Expose({name: 'target'})
    target: string;

    /**
     * Token's address
     */
    @Expose({name: 'token_address'})
    tokenAddress: string;

    /**
     * Network's identifier
     */
    @Expose({name: 'token_network_identifier'})
    tokenNetworkIdentifier: string;

    /**
     * The transferred amount is the total amount of tokens one participant of a payment
     * channel has sent to his counterparty.
     */
    @Expose({name: 'transferred_amount'})
    transferredAmount: string;

    /**
     * Constructor for Transfer.
     * @param transfer
     */
    constructor(transfer: Partial<Transfer>) {
        Object.assign(this, transfer);
    }
}
