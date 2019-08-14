import { AddressesClient } from '../src/client/addresses';
import nock from 'nock';

describe('AddressClient', () => {
    const scope = nock('http://localhost:5001/api/v1');
    const addressClient = new AddressesClient({
        host: 'http://localhost:5001',
        apiVersion: 'v1'
    });

    beforeAll(() => {
        scope.persist()
            .get('/address')
            .reply(200, {
                'our_address': '0x2a65Aca4D5fC5B5C859090a6c34d164135398226'
            });
    });

    it('should return our own address as string.', async () => {
        const address = await addressClient.get();
        expect(address).toEqual('0x2a65Aca4D5fC5B5C859090a6c34d164135398226');
    });
});
