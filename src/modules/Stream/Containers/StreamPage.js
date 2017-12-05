import React, {Component} from 'react';
import {connect} from 'react-redux';
import qs from 'qs';

import StreamWrapper from '../Components/StreamWrapper';
import {getAction, getError, getData, getEvents} from '../../../redux/stream';

@connect(
    state => ({
        error: getError(state),
        data: getData(state),
        events: getEvents(state)
    }),
    {getStreamAction: getAction}
)
class StreamPage extends Component {
    componentWillReceiveProps(nextProps) {
        const id = this.props.match.params.id;
        const newId = nextProps.match.params.id;

        if (newId !== id) {
            this.props.getStreamAction(newId);
        }
    }

    render() {
        const {stream, subscribers, options, info, relatedStreams} = this.props.data;
        const {search} = this.props.location;
        const {events} = this.props;

        let searchParams = qs.parse(search, {ignoreQueryPrefix: true});

        return <div>
            <StreamWrapper
                stream={stream}
                subscribers={subscribers}
                options={options}
                info={info}
                relatedStreams={relatedStreams}
                events={events}
                getData={this.props.getStreamAction}
                streamId={this.props.match.params.id}
                searchParams={searchParams}
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
