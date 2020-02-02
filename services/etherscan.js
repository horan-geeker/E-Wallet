import Utils from './Utils'
const MAIN_URL = 'http://23.111.175.138//api'

const PAGE_SIZE = 100

export default class EtherScan {

    request(params) {
        console.log('request', MAIN_URL + '?' + Utils.buildURLParams(params))
        return fetch(MAIN_URL + '?' + Utils.buildURLParams(params))
            .then((response) => {
                console.log('response', 'done')
                return response.json()
            })
            .catch(error => {
                console.log('request', error)
            })
    }

    getTransactionsByAddress(address, page = 1) {
        return this.request({
            module: 'account',
            action: 'txlist',
            address: address,
            tag: 'latest',
            page: 1,
            offset: PAGE_SIZE
        })
    }
}