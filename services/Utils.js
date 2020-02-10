export default class  Utils {

    static buildURLParams(params) {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }

    static timestampToString(timestamp) {
        const date = new Date(timestamp * 1000)
        // Year
        const year = date.getFullYear()
        // month
        const month = date.getMonth() + 1
        // day
        const day = date.getDate()
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }
}