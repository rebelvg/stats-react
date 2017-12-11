import React, {Component} from 'react';
import {connect} from 'react-redux';

import SubscriberWrapper from '../Components/SubscriberWrapper';
import {getAction, getError, getData} from '../../../redux/subscriber';

@connect(
    state => ({
        error: getError(state),
        data: getData(state)
    }),
    {getSubscriberAction: getAction}
)
class SubscriberPage extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;

        this.props.getSubscriberAction(id);
    }

    render() {
        const {subscriber = null, streams = []} = this.props.data;
        const {error} = this.props;

        if (error) return <div>{error}</div>;

        return <div>
            <SubscriberWrapper
                subscriber={subscriber}
                streams={streams}
            />

            <button onClick={() => {
                const id = this.props.match.params.id;

                this.props.getSubscriberAction(id);
            }}>Refresh
            </button>
        </div>
    }
}

export default SubscriberPage;
