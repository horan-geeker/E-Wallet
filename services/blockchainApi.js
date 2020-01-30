import Infura from './infura'

const ETH = 'eth'
const BTC = 'btc'

export default class BlockchainApi {
    constructor() {
        this.driver = new Infura()
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

    getTokenToUSDPrice(tokenType) {
        tokenType = tokenType.toUpperCase()
        const url = "https://min-api.cryptocompare.com/data/price?fsym=" + tokenType + "&tsyms=USD"
        return fetch(url).then(response => response.json())
    }
}