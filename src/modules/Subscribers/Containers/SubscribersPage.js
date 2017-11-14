import React, {Component} from 'react';
import {connect} from 'react-redux';

import SubscriberWrapper from '../Components/SubscribersWrapper';
import {getSubscribersAction, getError, getData, getLoading} from '../../../redux/subscribers';

@connect(
    state => ({
        error: getError(state),
        data: getData(state),
        isLoading: getLoading(state)
    }),
    {getSubscribersAction}
)
class SubscribersPage extends Component {
    componentDidMount() {
        this.props.getSubscribersAction();
    }

    render() {
        const {subscribers, total, limit, page, pages} = this.props.data;
        const {isLoading} = this.props;

        return (
            <div>
                <SubscriberWrapper
                    subscribers={subscribers}
                    getData={this.props.getSubscribersAction}
                    pages={pages}
                    isLoading={isLoading}
                />

                <div>Showing: {subscribers.length}</div>
                <div>Total: {total}</div>
                <div>Limit: {limit}</div>
                <div>Page: {page}</div>
                <div>Pages: {pages}</div>

                <button onClick={() => {
                    this.props.getSubscribersAction();
                }}>Refresh
                </button>
            </div>
        );
    }
}

export default SubscribersPage;
