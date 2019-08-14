import { ClientConfig } from '../client.config';
import { BaseClient } from '../util/base-client';
import { Payment } from './payment.class';
import axios from 'axios';
import { PaymentConfig } from './payment.config';
import { plainToClass } from 'class-transformer';

/**
 *
 * Raiden sub-client for Payments.
 */
export class PaymentsClient extends BaseClient {
    /**
     * Constructor for PaymentsClient
     * @param config, should contain host url and api version
     */
    constructor(config: ClientConfig) {
        super(config);
    }

    /**
     * Initiate a payment.
     * The request will only return once the payment either succeeded or failed.
     * A payment can fail due to the expiration of a lock, the target being offline,
     * channels on the path to the target not having enough settle_timeout and reveal_timeout
     * in order to allow the payment to be propagated safely, not enough funds etc.
     * @param tokenAddress
     * @param targetAddress
     * @param paymentConfig
     */
    async initiatePayment(tokenAddress: string, targetAddress: string, paymentConfig: PaymentConfig): Promise<Payment> {
        const res = await axios.post(this.initiatePaymentRequestUrl(tokenAddress, targetAddress), paymentConfig);
        return plainToClass(Payment, res.data as object) as Payment;
    }

    /**
     * Url for initiating payment request
     * @param tokenAddress
     * @param targetAddress
     */
    initiatePaymentRequestUrl(tokenAddress: string, targetAddress: string): string {
        return this.host + '/api/' + this.version + '/payments/' + tokenAddress + '/' + targetAddress;
    }
}
