import nock from 'nock';
import { TokensClient } from '../../src/client/tokens';

describe('TokensClient', () => {
    const scope = nock('http://localhost:5001/api/v1');
    const tokensClient = new TokensClient({
        host: 'http://localhost:5001',
        apiVersion: 'v1'
    });

    beforeAll(() => {
        scope.persist()
            .get('/tokens')
            .reply(200, [
                '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8',
                '0x61bB630D3B2e8eda0FC1d50F9f958eC02e3969F6'
            ]);
        scope.persist()
            .get('/tokens/0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8')
            .reply(200, '0x61bB630D3B2e8eda0FC1d50F9f958eC02e3969F6');
        scope.persist()
            .get('/tokens/0x61bB630D3B2e8eda0FC1d50F9f958eC02e3969F6/partners')
            .reply(200, [
                {
                    'partner_address': '0x2a65aca4d5fc5b5c859090a6c34d164135398226',
                    'channel': '/api/v1/channels/0x61C808D82A3Ac53231750daDc13c777b59310bD9/0x2a65aca4d5fc5b5c859090a6c34d164135398226'
                }
            ]);
    });

    it('should return a list of registered tokens', async () => {
        const tokens = await tokensClient.list();
        expect(tokens.length).toEqual(2);
        expect(tokens[0]).toEqual('0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8');
    });

    it('should return the token associated with given address', async () => {
        const token = await tokensClient.get('0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8');
        expect(token).toEqual('0x61bB630D3B2e8eda0FC1d50F9f958eC02e3969F6');
    });

    it('should return all partners whom you have non-settled channels', async () => {
        const partners = await tokensClient.listPartners('0x61bB630D3B2e8eda0FC1d50F9f958eC02e3969F6');
        expect(partners.length).toEqual(1);
        expect(partners[0].partnerAddress).toEqual('0x2a65aca4d5fc5b5c859090a6c34d164135398226');
        expect(partners[0].channel).toEqual('/api/v1/channels/0x61C808D82A3Ac53231750daDc13c777b59310bD9/0x2a65aca4d5fc5b5c859090a6c34d164135398226');
    });
});
