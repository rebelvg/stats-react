import _ from 'lodash';
import strtotime from 'locutus/php/datetime/strtotime';

let defaultFilterMethod = (filter, row, column) => {
    const strings = ['app', 'channel', 'ip', 'protocol'];
    const numbers = {
        bitrate: 1,
        bytes: 1024 * 1024,
        duration: 60,
        viewersCount: 1
    };
    const dates = ['connectCreated', 'connectUpdated'];

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
        default: {
            return true;
        }
    }
};

export default defaultFilterMethod;
