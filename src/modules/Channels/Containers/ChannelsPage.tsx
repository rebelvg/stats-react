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
        {servers.map((serverObj, id) => {
          const serverName = serverObj.serverName;
          const apps = serverObj.apps;

          if (apps.length === 0) {
            return (
              <Alert key={id} color="danger">
                No channels online for {serverName}.
              </Alert>
            );
          }

          return (
            <div>
              <Alert color="success">Live channels for {serverName}</Alert>

              {apps.map((appObj, serverId) => {
                const appName = appObj.appName;
                const channels = appObj.channels;

                return channels.map((channelObj, channelId) => {
                  const channelName = channelObj.channelName;
                  const stream = channelObj.publisher;
                  const subscribers = channelObj.subscribers;

                  return (
                    <div>
                      <ChannelWrapper
                        key={`${serverId}-${channelId}`}
                        stream={stream}
                        subscribers={subscribers}
                      />
                      <br />
                    </div>
                  );
                });
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ChannelsPage;
