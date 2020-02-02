import Infura from './infura'
import EtherScan from './etherscan'

const ETH = 'eth'
const BTC = 'btc'

export default class BlockchainApi {
    constructor() {
        this.driver = new Infura()
        this.etherscan = new EtherScan()
    }

    getBalance(tokenType, address) {
        if (tokenType === ETH) {
            return this.driver.getETHBalance(address)
        }
    }

    getBlockNumber(tokenType) {
        if (tokenType === ETH) {
            return this.driver.getETHBlockNumber()
        }
    }

    getTransactionByAddress(token, address) {
        if (token === ETH) {
            return this.etherscan.getTransactionsByAddress(address)
        }
    }

    getTokenToUSDPrice(tokenType) {
        tokenType = tokenType.toUpperCase()
        const url = "https://min-api.cryptocompare.com/data/price?fsym=" + tokenType + "&tsyms=USD"
        return fetch(url).then(response => response.json())
    }
}