import { Expose } from 'class-transformer';

export class Partner {
    /**
     * Partner's address
     */
    @Expose({name: 'partner_address'})
    partnerAddress: string;

    /**
     * Channels address
     */
    @Expose({name: 'channel'})
    channel: string;

    constructor(partner: Partial<Partner>) {
        Object.assign(this, partner);
    }
}
