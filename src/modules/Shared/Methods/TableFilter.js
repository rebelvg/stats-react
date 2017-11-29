import _ from 'lodash';
import strtotime from 'locutus/php/datetime/strtotime';

let defaultFilterMethod = (filter, row, column) => {
    const strings = ['app', 'channel', 'protocol'];
    const numbers = {
        bitrate: 1,
        bytes: 1024 * 1024,
        duration: 60,
        totalConnectionsCount: 1,
        peakViewersCount: 1
    };
    const dates = ['connectCreated', 'connectUpdated'];
    const ips = ['ip'];

    switch (true) {
        case strings.includes(filter.id): {
            return (new RegExp(filter.value, 'gi').test(row[filter.id]));
        }
        case Object.keys(numbers).includes(filter.id): {
            return _.gte(row[filter.id], filter.value * numbers[filter.id]);
        }
        case dates.includes(filter.id): {
            return _.gte(strtotime(row[filter.id]), strtotime(filter.value));
        }
        case ips.includes(filter.id): {
            return (new RegExp(filter.value, 'gi').test(row._original.ip))
                || !row._original.location
                || (new RegExp(filter.value, 'gi').test(row._original.location.api.country))
                || (new RegExp(filter.value, 'gi').test(row._original.location.api.city))
                || (new RegExp(filter.value, 'gi').test(row._original.location.api.isp))
                || (new RegExp(filter.value, 'gi').test(row._original.location.api.countryCode))
                || (new RegExp(filter.value, 'gi').test(row._original.location.api.message));
        }
        default: {
            return true;
        }
    }
};

export default defaultFilterMethod;
