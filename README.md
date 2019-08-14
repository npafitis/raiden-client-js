# raiden-client-js
Lightweight, well-documented and clean Javascript client library for [Raiden API](https://raiden-network.readthedocs.io/en/stable/index.html), written in typescript.
For more documentation visit [our Github page](https://npafitis.github.io/raiden-client-js/)
## Getting Started

### Installing
To install library using npm:
```bash
npm install raiden-client-js
```

Example usage in typescript:
```typescript
import {RaidenClient} from 'raiden-client-js';
...

const client = new RaidenClient({
   host: 'http://localhost:5001',
   apiVersion: 'v1' 
});

const myAddress = await client.addressesClient.get();
client.connectionsClient.joinTokenNetwork('0x2a65Aca4D5fC5B5C859090a6c34d164135398226', {
    funds: 1337,
});

const payment = await paymentsClient.initiatePayment(
            '0x2a65Aca4D5fC5B5C859090a6c34d164135398226',
            '0x61C808D82A3Ac53231750daDc13c777b59310bD9',
            {
                amount: 200,
                identifier: 42
            }
        );
```
For more information about Raiden API please visit:
[Raiden API](https://raiden-network.readthedocs.io/en/stable/rest_api.html#introduction)
## Development

### Testing
Tests are written using [jasmine](https://jasmine.github.io/) and [nock](https://github.com/nock/nock`) for server mocking.
To run unit tests use:
```bash
npm run test
```

### Generating documentation
Docs are generated using [typedoc](https://typedoc.org/) in the /docs folder. 
To generate docs use:

```bash
npm run generate:docs
```
