import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import ChannelWrapper from '../Components/ChannelWrapper';
import {getAction, getError, getData} from '../../../redux/channels';

@connect(
    state => ({
        error: getError(state),
        data: getData(state)
    }),
    {getAction}
)
class ChannelsPage extends Component {
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

        if (_.isEmpty(servers)) return <div>No servers online.</div>;

        return (
            <div>
                {
                    Object.entries(servers).map((serversObj) => {
                        const [serverName, serverObj] = serversObj;

                        if (_.isEmpty(serverObj)) return <div>No channels online for {serverName}.</div>;

                        return Object.entries(serverObj).map((appsObj) => {
                            const [appName, appObj] = appsObj;

                            return Object.entries(appObj).map((channelsObj) => {
                                const [channelName, channelObj] = channelsObj;

                                const stream = channelObj.publisher;
                                const subscribers = channelObj.subscribers;

                                return <ChannelWrapper
                                    stream={stream}
                                    subscribers={subscribers}
                                />
                            });
                        });
                    })
                }
            </div>
        );
    }
}

export default ChannelsPage;
