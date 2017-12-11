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
        const {error} = this.props;

        if (error) return <div>{error}</div>;

        if (_.isEmpty(servers)) return <div>No servers online.</div>;

        return (
            <div>
                {
                    Object.entries(servers).map(([serverName, serverObj]) => {
                        if (_.isEmpty(serverObj)) return <div>No channels online for {serverName}.</div>;

                        return Object.entries(serverObj).map(([appName, appObj]) => {
                            return Object.entries(appObj).map(([channelName, channelObj]) => {
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
