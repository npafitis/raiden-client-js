import nock from 'nock';
import { Connection, ConnectionsClient, JoinConfig } from '../src/client/connections';

describe('ConnectionsClient', () => {
    const scope = nock('http://localhost:5001/api/v1');
    const connectionsClient = new ConnectionsClient({
        host: 'http://localhost:5001',
        apiVersion: 'v1'
    });

    beforeAll(() => {
        scope.persist()
            .get('/connections')
            .reply(200, {
                '0x2a65Aca4D5fC5B5C859090a6c34d164135398226': {
                    'funds': 100,
                    'sum_deposits': 67,
                    'channels': 3
                },
                '0x0f114A1E9Db192502E7856309cc899952b3db1ED': {
                    'funds': 49,
                    'sum_deposits': 31,
                    'channels': 1
                }
            });
        scope.persist()
            .put('/connections/0x2a65Aca4D5fC5B5C859090a6c34d164135398226', {
                funds: 1337
            })
            .reply(204, {
                funds: 1337
            });
        scope.persist()
            .delete('/connections/0x2a65Aca4D5fC5B5C859090a6c34d164135398226')
            .reply(204, [
                '0x41BCBC2fD72a731bcc136Cf6F7442e9C19e9f313',
                '0x5A5f458F6c1a034930E45dC9a64B99d7def06D7E',
                '0x8942c06FaA74cEBFf7d55B79F9989AdfC85C6b85'
            ]);
    });

    it('should list all token networks', async () => {
        const connections: Connection[] = await connectionsClient.list();
        expect(connections.length).toEqual(2);
        expect(connections
            .find(connection => connection.tokenAddress === '0x2a65Aca4D5fC5B5C859090a6c34d164135398226'))
            .toBeDefined();
    });

    it('should join given network', async () => {
        await connectionsClient.joinTokenNetwork('0x2a65Aca4D5fC5B5C859090a6c34d164135398226', {
            funds: 1337,
        });
        expect(true).toEqual(true);
    });

    it('should leave given network', async () => {
        const channels: string[] = await connectionsClient.leaveTokenNetwork('0x2a65Aca4D5fC5B5C859090a6c34d164135398226');
        expect(channels.length).toEqual(3);
    });
});
