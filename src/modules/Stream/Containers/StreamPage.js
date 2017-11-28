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

    componentWillReceiveProps(nextProps) {
        const id = this.props.match.params.id;
        const newId = nextProps.match.params.id;

        if (newId !== id) {
            this.props.getStreamAction(newId);
        }
    }

    render() {
        const {stream, subscribers, options, relatedStreams} = this.props.data;
        const {events} = this.props;

        return <div>
            <StreamWrapper
                stream={stream}
                subscribers={subscribers}
                options={options}
                relatedStreams={relatedStreams}
                events={events}
                getData={this.props.getStreamAction}
                streamId={this.props.match.params.id}
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
