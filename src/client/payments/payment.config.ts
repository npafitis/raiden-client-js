import { Expose } from 'class-transformer';

export class PaymentConfig {
    /**
     *
     * Amount to be sent to the target
     */
    @Expose({name: 'amount'})
    amount: number;

    /**
     *
     * Identifier of the payment
     */
    @Expose({name: 'identifier'})
    identifier?: number;
}
