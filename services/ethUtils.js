export default class EthUtils {
    static WeiToEther(wei) {
        return wei / 1000000000000000000
    }
    static WeiToUSD(wei, USDPrice) {
        return this.WeiToEther(wei) * USDPrice
    }
    static numberFix(number, position) {
        const i = Math.pow(10, position)
        return Math.floor(number * i) / i
    }
}