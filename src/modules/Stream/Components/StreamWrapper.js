import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from "moment";
import {Link} from 'react-router-dom';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import _ from 'lodash';

import streamsTable from '../../Shared/Tables/StreamsTable';
import subscribersTable from '../../Shared/Tables/SubscribersTable';
import defaultFilterMethod from '../../Shared/Methods/TableFilter';

class StreamWrapper extends Component {
    render() {
        const {stream = null, subscribers = [], events = []} = this.props;

        let streams = [];

        if (stream) streams.push(stream);

        return (<div>
            Stream
            <ReactTable
                columns={streamsTable}
                data={streams}
                showPagination={false}
                minRows={0}
                sortable={false}
            />

            <ResponsiveContainer width='99%' height={450}>
                <LineChart data={_.map(events, (event) => {
                    event.time = moment(event.time).format('ddd HH:mm');
                    event.subscribersCount = event.subscribers.length;
                    return event;
                })}>
                    <XAxis dataKey="time"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="subscribersCount" stroke="#82ca9d"/>
                </LineChart>
            </ResponsiveContainer>

            Subscribers: {subscribers.length}
            <ReactTable
                columns={subscribersTable}
                data={subscribers}
                minRows={0}
                defaultFilterMethod={defaultFilterMethod}
                filterable
            />
        </div>);
    }
}

export default StreamWrapper;
