import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { Alert } from 'reactstrap';

import StreamWrapper from '../Components/StreamWrapper';
import { getAction, getError, getData, getEvents } from '../../../redux/stream';

@connect(
  (state) => ({
    error: getError(state),
    data: getData(state),
    events: getEvents(state),
  }),
  { getAction },
)
class StreamPage extends Component<any, any> {
  componentWillReceiveProps(nextProps) {
    const id = this.props.match.params.id;
    const newId = nextProps.match.params.id;

    if (newId !== id) {
      this.props.getAction(newId);
    }
  }

  componentWillMount(): void {
    const id = this.props.match.params.id;

    this.props.getAction(id);
  }

  render() {
    const {
      stream,
      subscribers,
      options,
      info,
      relatedStreams,
    } = this.props.data;
    const { search } = this.props.location;
    const { error, events } = this.props;

    if (error) return <Alert color="danger">{error}</Alert>;

    let searchParams = qs.parse(search, { ignoreQueryPrefix: true });

    return (
      <div>
        <button
          onClick={() => {
            const id = this.props.match.params.id;

            this.props.getAction(id);
          }}
        >
          Refresh
        </button>

        <StreamWrapper
          stream={stream}
          subscribers={subscribers}
          options={options}
          info={info}
          relatedStreams={relatedStreams}
          events={events}
          getData={this.props.getAction}
          streamId={this.props.match.params.id}
          searchParams={searchParams}
        />

        <button
          onClick={() => {
            const id = this.props.match.params.id;

            this.props.getAction(id);
          }}
        >
          Refresh
        </button>
      </div>
    );
  }
}

export default StreamPage;
