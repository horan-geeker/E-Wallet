const PROJECT_ID = '1ae8fcc50fda480fa5ce0e6231314e3f';
const MAIN_URL = 'https://mainnet.infura.io/v3/' + PROJECT_ID;
const PROJECT_SECRET = '33bd11c1ccd141268d92306e2a7d2917'

export default class Infura {

    request(method, params) {
        return fetch(MAIN_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "id":  1,
                "method": method,
                "params": params
            }),
        })
            .then((response) => response.json())
    }

    getETHBalance(address) {
        return this.request('eth_getBalance', [address, 'latest'])
    }

    getETHBlockNumber() {
        return this.request('eth_blockNumber')
    }

    getETHGasPrice() {
        return this.request('eth_gasPrice')
    }

    getETHTransactionByAddress() {
        return this.request('eth_transaction')
    }
}