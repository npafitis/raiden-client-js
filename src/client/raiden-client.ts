import { ClientConfig } from './client.config';
import { AddressesClient } from './addresses';
import { ChannelsClient } from './channels';
import { ConnectionsClient } from './connections';
import { PaymentsClient } from './payments';
import { PendingTransfersClient } from './pending-transfers';
import { TokensClient } from './tokens';
import { BaseClient } from './util/base-client';

export class RaidenClient extends BaseClient {
    private readonly _addressesClient: AddressesClient;
    private readonly _channelsClient: ChannelsClient;
    private readonly _connectionsClient: ConnectionsClient;
    private readonly _paymentsClient: PaymentsClient;
    private readonly _pendingTransfersClient: PendingTransfersClient;
    private readonly _tokensClient: TokensClient;

    get addressesClient(): AddressesClient {
        return this._addressesClient;
    }

    get channelsClient(): ChannelsClient {
        return this._channelsClient;
    }

    get connectionsClient(): ConnectionsClient {
        return this._connectionsClient;
    }

    get paymentsClient(): PaymentsClient {
        return this._paymentsClient;
    }

    get pendingTransfersClient(): PendingTransfersClient {
        return this._pendingTransfersClient;
    }

    get tokensClient(): TokensClient {
        return this._tokensClient;
    }

    constructor(config: ClientConfig) {
        super(config);
        this._addressesClient = new AddressesClient(config);
        this._channelsClient = new ChannelsClient(config);
        this._connectionsClient = new ConnectionsClient(config);
        this._paymentsClient = new PaymentsClient(config);
        this._pendingTransfersClient = new PendingTransfersClient(config);
        this._tokensClient = new TokensClient(config);
    }
}
