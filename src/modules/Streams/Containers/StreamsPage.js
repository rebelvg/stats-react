import React, {Component} from 'react';
import {connect} from 'react-redux';
import humanize from 'humanize-plus';
import moment from 'moment';
import qs from 'qs';
import humanizeDuration from 'humanize-duration';

import StreamsWrapper from '../Components/StreamsWrapper';
import {getStreamsAction, getError, getData, getLoading} from '../../../redux/streams';

@connect(
    state => ({
        error: getError(state),
        data: getData(state),
        isLoading: getLoading(state)
    }),
    {getStreamsAction}
)
class StreamsPage extends Component {
    render() {
        const {streams = [], options = {}, info = {}, total, limit, page, pages} = this.props.data;
        const {totalBytes, totalDuration, totalConnections, totalPeakViewers, totalIPs} = info;
        const {search} = this.props.location;
        const {isLoading} = this.props;

        let searchParams = qs.parse(search, {ignoreQueryPrefix: true});

        return (
            <div>
                <StreamsWrapper
                    streams={streams}
                    options={options}
                    pages={pages}
                    getData={this.props.getStreamsAction}
                    searchParams={searchParams}
                    isLoading={isLoading}
                />

                <div>Total Traffic: {humanize.fileSize(totalBytes)}</div>
                <div>Total Duration: {humanizeDuration(totalDuration * 1000, {
                    round: true,
                    largest: 3
                })}</div>
                <div>Total Connections: {totalConnections}</div>
                <div>Total Peak Viewers: {totalPeakViewers}</div>
                <div>Unique IPs: {totalIPs}</div>
                <br/>
                <div>Showing: {streams.length}</div>
                <div>Total: {total}</div>
                <div>Limit: {limit}</div>
                <div>Page: {page}</div>
                <div>Pages: {pages}</div>

                <button onClick={() => {
                    this.props.getStreamsAction();
                }}>Refresh
                </button>
            </div>
        );
    }
}

export default StreamsPage;
