import nock from 'nock';
import { PendingTransfersClient } from '../src/client/pending-transfers';

describe('PendingTransfersClient', () => {
    const scope = nock('http://localhost:5001/api/v1');
    const pendingTransfersClient = new PendingTransfersClient({
        host: 'http://localhost:5001',
        apiVersion: 'v1'
    });

    beforeAll(() => {
        scope.persist()
            .get('/pending_transfers')
            .reply(200, [
                {
                    'channel_identifier': '255',
                    'initiator': '0x5E1a3601538f94c9e6D2B40F7589030ac5885FE7',
                    'locked_amount': '119',
                    'payment_identifier': '1',
                    'role': 'initiator',
                    'target': '0x00AF5cBfc8dC76cd599aF623E60F763228906F3E',
                    'token_address': '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
                    'token_network_identifier': '0x111157460c0F41EfD9107239B7864c062aA8B978',
                    'transferred_amount': '331'
                }
            ]);
        scope.persist()
            .get('/pending_transfers/0xd0A1E359811322d97991E03f863a0C30C2cF029C')
            .reply(200, [
                {
                    'channel_identifier': '255',
                    'initiator': '0x5E1a3601538f94c9e6D2B40F7589030ac5885FE7',
                    'locked_amount': '119',
                    'payment_identifier': '1',
                    'role': 'initiator',
                    'target': '0x00AF5cBfc8dC76cd599aF623E60F763228906F3E',
                    'token_address': '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
                    'token_network_identifier': '0x111157460c0F41EfD9107239B7864c062aA8B978',
                    'transferred_amount': '331'
                }
            ]);
        scope.persist()
            .get('/pending_transfers/0xd0A1E359811322d97991E03f863a0C30C2cF029C/0x2c4b0Bdac486d492E3cD701F4cA87e480AE4C685')
            .reply(200, [
                {
                    'channel_identifier': '255',
                    'initiator': '0x5E1a3601538f94c9e6D2B40F7589030ac5885FE7',
                    'locked_amount': '119',
                    'payment_identifier': '1',
                    'role': 'initiator',
                    'target': '0x00AF5cBfc8dC76cd599aF623E60F763228906F3E',
                    'token_address': '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
                    'token_network_identifier': '0x111157460c0F41EfD9107239B7864c062aA8B978',
                    'transferred_amount': '331'
                }
            ]);
    });

    it('should list all pending transfers', async () => {
        const pending = await pendingTransfersClient.list();
        expect(pending.length).toEqual(1);
    });

    it('should list all pending transfers of this token', async () => {
        const pending = await pendingTransfersClient.listToken('0xd0A1E359811322d97991E03f863a0C30C2cF029C');
        expect(pending.length).toEqual(1);
    });

    it('should list all pending transfers of this channel', async () => {
        const pending = await pendingTransfersClient.listChannel('0xd0A1E359811322d97991E03f863a0C30C2cF029C', '0x2c4b0Bdac486d492E3cD701F4cA87e480AE4C685');
        expect(pending.length).toEqual(1);
    });
});
