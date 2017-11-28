import React, {Component} from 'react';
import {connect} from 'react-redux';
import humanize from 'humanize-plus';
import moment from "moment";

import StreamWrappers from '../Components/StreamsWrapper';
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
    componentDidMount() {
        this.props.getStreamsAction();
    }

    render() {
        const {streams = [], options = {}, info = {}, total, limit, page, pages} = this.props.data;
        const {totalBytes, totalDuration, totalConnections, totalPeakViewers, totalIPs} = info;
        const {isLoading} = this.props;

        return (
            <div>
                <StreamWrappers
                    streams={streams}
                    options={options}
                    pages={pages}
                    getData={this.props.getStreamsAction}
                    isLoading={isLoading}
                />

                <div>Total Traffic: {humanize.fileSize(totalBytes)}</div>
                <div>Total Duration: {moment.duration(totalDuration, 'seconds').humanize()}</div>
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
