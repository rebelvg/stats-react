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
        console.log('componentDidMount');

        this.timerId = setInterval(() => {
            this.props.getAction();
        }, 5000);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');

        clearInterval(this.timerId);
    }

    render() {
        const servers = this.props.data;

        return (
            <div>
                {
                    Object.entries(servers).map((serversObj) => {
                        const [serverName, serverObj] = serversObj;

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
