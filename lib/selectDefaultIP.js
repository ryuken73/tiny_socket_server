const constants = require('../config.js');
const {PREFERED_IP_ADDRESSES} = constants;
const selectDefaultIP = ipAddresses => {
    const ipAddressesWithIndex = ipAddresses.reduce((acct, ipAddress) => {
        const index = PREFERED_IP_ADDRESSES.findIndex(ip => ipAddress.startsWith(ip));
        const indexNotFoundHighest = index === -1 ? 99999 : index;
        return [
            ...acct,
            {
                ipAddress,
                index: indexNotFoundHighest
            }
        ]
    },[]);
    const indexes = ipAddressesWithIndex.map(ipAddress => ipAddress.index)
    const maxIndex = Math.min(...indexes);
    return ipAddressesWithIndex.find(ipaddress => ipaddress.index === maxIndex);
}

// console.log(selectDefaultIP(['10.10.16.1', '192.168.4.3', '127.0.0.1']))
// console.log(selectDefaultIP(['192.168.4.3', '10.40.24.69', '127.0.0.1']))
// console.log(selectDefaultIP(['1.1.1.1', '10.40.24.69', '2.0.0.1']))
// console.log(selectDefaultIP(['2.2.2.1', '3.3.3.3', '2.0.0.1']))

module.exports = selectDefaultIP;