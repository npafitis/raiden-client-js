import nock from 'nock';
import { PaymentsClient } from '../src/client/payments';

describe('PaymentsClient', () => {
    const scope = nock('http://localhost:5001/api/v1');
    const paymentsClient = new PaymentsClient({
        host: 'http://localhost:5001',
        apiVersion: 'v1'
    });
    beforeAll(() => {
        scope.persist()
            .post('/payments/0x2a65Aca4D5fC5B5C859090a6c34d164135398226/0x61C808D82A3Ac53231750daDc13c777b59310bD9', {
                amount: 200,
                identifier: 42
            })
            .reply(200, {
                'initiator_address': '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8',
                'target_address': '0x61C808D82A3Ac53231750daDc13c777b59310bD9',
                'token_address': '0x2a65Aca4D5fC5B5C859090a6c34d164135398226',
                'amount': 200,
                'identifier': 42
            });
    });

    it('should initiate a new payment', async () => {
        const payment = await paymentsClient.initiatePayment(
            '0x2a65Aca4D5fC5B5C859090a6c34d164135398226',
            '0x61C808D82A3Ac53231750daDc13c777b59310bD9',
            {
                amount: 200,
                identifier: 42
            }
        );
        expect(payment.amount).toEqual(200);
        expect(payment.targetAddress).toEqual('0x61C808D82A3Ac53231750daDc13c777b59310bD9');
    });
});
