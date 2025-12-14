import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Alert } from 'reactstrap';

import ChannelWrapper from '../Components/ChannelWrapper';
import { getAction, getError, getData } from '../../../redux/channels';

@connect(
  (state) => ({
    error: getError(state),
    data: getData(state),
  }),
  { getAction },
)
class ChannelsPage extends Component<any, any> {
  timerId;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAction();

    this.timerId = setInterval(() => {
      this.props.getAction();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const { channels = [] } = this.props.data;

    const { error } = this.props;

    if (error) return <Alert color="danger">{error}</Alert>;

    if (channels.length === 0)
      return <Alert color="info">No channels online.</Alert>;

    return (
      <div>
        {channels.map(({ streams }, channelId) => {
          if (streams.length === 0) {
            return (
              <Alert key={channelId} color="info">
                No streams online.
              </Alert>
            );
          }

          return (
            <div key={channelId}>
              {streams.map((stream, streamId) => {
                return (
                  <div key={`${channelId}-${streamId}}`}>
                    <Alert key={channelId} color="success">
                      channel/{stream.name}
                    </Alert>
                    <ChannelWrapper stream={stream} />
                    <br />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ChannelsPage;
