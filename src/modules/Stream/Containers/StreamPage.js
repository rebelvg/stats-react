import React, {Component} from 'react';
import {connect} from 'react-redux';

import StreamWrapper from '../Components/StreamWrapper';
import {getStreamAction, getError, getData, getEvents} from '../../../redux/stream';

@connect(
    state => ({
        error: getError(state),
        data: getData(state),
        events: getEvents(state)
    }),
    {getStreamAction}
)
class StreamPage extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;

        this.props.getStreamAction(id);
    }

    render() {
        const {stream, subscribers, relatedStreams} = this.props.data;
        const {events} = this.props;

        return <div>
            <StreamWrapper
                stream={stream}
                subscribers={subscribers}
                events={events}
                relatedStreams={relatedStreams}
            />

            <button onClick={() => {
                const id = this.props.match.params.id;

                this.props.getStreamAction(id);
            }}>Refresh
            </button>
        </div>
    }
}

export default StreamPage;
