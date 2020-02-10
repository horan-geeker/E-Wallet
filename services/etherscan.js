import Utils from './Utils'
const MAIN_URL = 'http://23.111.175.138/api'
const API_KEY = 'MIXSY7J9V1C2ZXNKD8SSU2SY4JFQC8S551'
const PAGE_SIZE = 100

export default class EtherScan {

    request(params) {
        params['apiKey'] = API_KEY
        console.log('request', MAIN_URL + '?' + Utils.buildURLParams(params))
        return fetch(MAIN_URL + '?' + Utils.buildURLParams(params))
            .then((response) => {
                console.log('response', 'done')
                return response.json()
            })
            .catch(error => {
                console.log('request error:', error)
            })
    }

    getTransactionsByAddress(address, page = 1) {
        return this.request({
            module: 'account',
            action: 'txlist',
            address: address,
            tag: 'latest',
            sort: 'desc',
            page: 1,
            offset: PAGE_SIZE
        })
    }
}