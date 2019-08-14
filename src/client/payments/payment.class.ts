import { Expose } from 'class-transformer';

export class Payment {
    /**
     *
     * Initiator's Address
     */
    @Expose({name: 'initiator_address'})
    initiatorAddress: string;

    /**
     *
     * Target's Address
     */
    @Expose({name: 'target_address'})
    targetAddress: string;

    /**
     *
     * Token's Address
     */
    @Expose({name: 'token_address'})
    tokenAddress: string;

    /**
     *
     * Amount to be sent to the target
     */
    @Expose({name: 'amount'})
    amount: number;

    /**
     *
     * Identifier  of the payment
     */
    @Expose({name: 'identifier'})
    identifier?: number;

    constructor(payment: Partial<Payment>) {
        Object.assign(this, payment);
    }
}
