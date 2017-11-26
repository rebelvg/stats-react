import React, {Component} from 'react';
import {connect} from 'react-redux';

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
        const {streams, options, total, limit, page, pages} = this.props.data;
        const {isLoading} = this.props;

        return (
            <div>
                <StreamWrappers
                    streams={streams}
                    options={options}
                    getData={this.props.getStreamsAction}
                    pages={pages}
                    isLoading={isLoading}
                />

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
