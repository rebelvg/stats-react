import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from "moment";
import {Link} from 'react-router-dom';

import streamsTable from '../../Shared/Tables/StreamsTable';
import subscribersTable from '../../Shared/Tables/SubscribersTable';
import defaultFilterMethod from '../../Shared/Methods/TableFilter';

class StreamWrapper extends Component {
    render() {
        const {subscriber = null, streams = []} = this.props;

        let subscribers = [];

        if (subscriber) subscribers.push(subscriber);

        return (<div>
            Subscriber
            <ReactTable
                columns={subscribersTable()}
                data={subscribers}
                showPagination={false}
                minRows={0}
                sortable={false}
            />

            Streams: {streams.length}
            <ReactTable
                columns={streamsTable()}
                data={streams}
                minRows={0}
                defaultFilterMethod={defaultFilterMethod}
                filterable
            />
        </div>);
    }
}

export default StreamWrapper;
