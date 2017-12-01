import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer} from 'recharts';
import _ from 'lodash';
import humanize from 'humanize-plus';

import streamsTable from '../../Shared/Tables/StreamsTable';
import subscribersTable from '../../Shared/Tables/SubscribersTable';
import defaultFilterMethod from '../../Shared/Methods/TableFilter';

const tickFormatter = (tick) => moment.unix(tick).format('ddd HH:mm');

class StreamWrapper extends Component {
    fetchData = (state, instance) => {
        this.props.getData(this.props.streamId, state.pageSize, state.page, state.filtered, state.sorted);
    };

    render() {
        const {stream = null, subscribers = [], options = {}, info = {}, relatedStreams = [], events = [],} = this.props;
        const {totalBytes, totalDuration, totalPeakViewers, totalIPs} = info;

        let streams = [];

        if (stream) streams.push(stream);

        return (<div>
            Stream
            <ReactTable
                columns={streamsTable()}
                data={streams}
                showPagination={false}
                minRows={0}
                sortable={false}
            />
            Related Streams: {relatedStreams.length}
            <ReactTable
                columns={streamsTable()}
                data={relatedStreams}
                showPagination={false}
                minRows={0}
                sortable={false}
            />

            <ResponsiveContainer width='100%' height={450}>
                <LineChart
                    data={_.map(events, (event) => {
                        event.unixTime = moment(event.time).unix();
                        event.subscribersCount = event.subscribers.length;
                        return event;
                    })}
                    margin={{top: 20, right: 50, left: 5, bottom: 5}}
                >
                    <XAxis dataKey="unixTime" tickFormatter={tickFormatter} type="number" scale="time"
                           domain={['dataMin', 'dataMax']}/>
                    <YAxis/>
                    <Tooltip labelFormatter={(value) => moment.unix(value).format('ddd HH:mm')}/>
                    <Legend/>
                    <Line name="Viewers" type="monotone" dataKey="subscribersCount" stroke="#82ca9d"/>
                </LineChart>
            </ResponsiveContainer>

            Subscribers: {subscribers.length}
            <div>Total Traffic: {humanize.fileSize(totalBytes)}</div>
            <div>Total Duration: {moment.duration(totalDuration, 'seconds').humanize()}</div>
            <div>Total Peak Viewers: {totalPeakViewers}</div>
            <div>Unique IPs: {totalIPs}</div>
            <ReactTable
                columns={subscribersTable(options, ['app', 'channel'])}
                data={subscribers}
                onFetchData={this.fetchData}
                showPagination={false}
                showPageSizeOptions={false}
                minRows={0}
                filterable
                manual
            />
        </div>);
    }
}

export default StreamWrapper;
