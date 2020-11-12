import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Alert } from 'reactstrap';

import ChannelWrapper from '../Components/ChannelWrapper';
import { getAction, getError, getData } from '../../../redux/channels';

@connect(
  state => ({
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
    const servers = this.props.data;
    const { error } = this.props;

    if (error) return <Alert color="danger">{error}</Alert>;

    if (_.isEmpty(servers))
      return <Alert color="danger">No servers online.</Alert>;

    return (
      <div>
        {Object.entries(servers).map(([serverName, serverObj], id) => {
          if (_.isEmpty(serverObj))
            return (
              <Alert key={id} color="danger">
                No channels online for {serverName}.
              </Alert>
            );

          return Object.entries(serverObj).map(
            ([appName, appObj], serverId) => {
              return Object.entries(appObj).map(
                ([channelName, channelObj]: any, channelId) => {
                  const stream = channelObj.publisher;
                  const subscribers = channelObj.subscribers;

                  return (
                    <ChannelWrapper
                      key={`${serverId}-${channelId}`}
                      stream={stream}
                      subscribers={subscribers}
                    />
                  );
                },
              );
            },
          );
        })}
      </div>
    );
  }
}

export default ChannelsPage;
