import nock from 'nock';
import { ChannelsClient, ChannelState } from '../src/client/channels';

describe('ChannelsClient', () => {
    const scope = nock('http://localhost:5001/api/v1');
    const channelsClient = new ChannelsClient({
        host: 'http://localhost:5001',
        apiVersion: 'v1'
    });

    beforeAll(() => {
        scope.persist()
            .put('/channels', {
                partner_address: '0x61C808D82A3Ac53231750daDc13c777b59310bD9',
                token_address: '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8',
                total_deposit: 35000000,
                settle_timeout: 500
            })
            .reply(201, {
                'token_network_identifier': '0xE5637F0103794C7e05469A9964E4563089a5E6f2',
                'channel_identifier': 20,
                'partner_address': '0x61C808D82A3Ac53231750daDc13c777b59310bD9',
                'token_address': '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8',
                'balance': 25000000,
                'total_deposit': 35000000,
                'state': 'opened',
                'settle_timeout': 500,
                'reveal_timeout': 30
            });
        scope.persist()
            .patch('/channels/0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8/0x61C808D82A3Ac53231750daDc13c777b59310bD9', {
                state: 'closed'
            })
            .reply(200, {
                'token_network_identifier': '0xE5637F0103794C7e05469A9964E4563089a5E6f2',
                'channel_identifier': 20,
                'partner_address': '0x61C808D82A3Ac53231750daDc13c777b59310bD9',
                'token_address': '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8',
                'balance': 25000000,
                'total_deposit': 35000000,
                'state': 'closed',
                'settle_timeout': 500,
                'reveal_timeout': 30
            });
        scope.persist()
            .patch('/channels/0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8/0x61C808D82A3Ac53231750daDc13c777b59310bD9', {
                total_deposit: 100
            })
            .reply(200, {
                'token_network_identifier': '0xE5637F0103794C7e05469A9964E4563089a5E6f2',
                'channel_identifier': 20,
                'partner_address': '0x61C808D82A3Ac53231750daDc13c777b59310bD9',
                'token_address': '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8',
                'balance': 25000000,
                'total_deposit': 100,
                'state': 'closed',
                'settle_timeout': 500,
                'reveal_timeout': 30
            });
    });

    it('should create a channel and return it as Channel object', async () => {
        const channel = await channelsClient.open(
            '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8',
            '0x61C808D82A3Ac53231750daDc13c777b59310bD9',
            35000000,
            500
        );
        expect(channel.tokenAddress).toEqual('0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8');
        expect(channel.partnerAddress).toEqual('0x61C808D82A3Ac53231750daDc13c777b59310bD9');
        expect(channel.revealTimeout).toEqual(30);
    });

    it('should close the channel', async () => {
        const channel = await channelsClient.close('0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8',
            '0x61C808D82A3Ac53231750daDc13c777b59310bD9');
        expect(channel.state).toEqual(ChannelState.CLOSED);
    });

    it('should change the amount of channel', async () => {
        const channel = await channelsClient.increaseDeposit('0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8',
            '0x61C808D82A3Ac53231750daDc13c777b59310bD9', 100);
        expect(channel.totalDeposit).toEqual(100);
    });
});
