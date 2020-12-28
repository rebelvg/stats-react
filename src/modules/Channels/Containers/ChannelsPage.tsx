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

    this.props.getAction();
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.props.getAction();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const { live: servers = [] } = this.props.data;
    const { error } = this.props;

    if (error) {
      return <Alert color="danger">{error}</Alert>;
    }

    if (servers.length === 0) {
      return <Alert color="danger">No servers online.</Alert>;
    }

    return (
      <div>
        {servers.map(({ server, apps }, id) => {
          if (apps.length === 0) {
            return (
              <Alert key={id} color="danger">
                No channels online for {server}.
              </Alert>
            );
          }

          return (
            <div>
              <Alert color="success">Live channels for {server}</Alert>

              {apps.map(({ app, channels }, serverId) => {
                return channels.map(
                  ({ channel, publisher, subscribers }, channelId) => {
                    return (
                      <div>
                        <ChannelWrapper
                          key={`${serverId}-${channelId}`}
                          stream={publisher}
                          subscribers={subscribers}
                        />
                        <br />
                      </div>
                    );
                  },
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
