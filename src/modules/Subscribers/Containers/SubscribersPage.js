import React, {Component} from 'react';
import {connect} from 'react-redux';
import humanize from 'humanize-plus';
import moment from "moment";

import SubscribersWrapper from '../Components/SubscribersWrapper';
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
        const {subscribers = [], options = {}, info = {}, total, limit, page, pages} = this.props.data;
        const {totalBytes, totalDuration, totalIPs} = info;
        const {isLoading} = this.props;

        return (
            <div>
                <SubscribersWrapper
                    subscribers={subscribers}
                    options={options}
                    pages={pages}
                    getData={this.props.getSubscribersAction}
                    isLoading={isLoading}
                />

                <div>Total Traffic: {humanize.fileSize(totalBytes)}</div>
                <div>Total Duration: {moment.duration(totalDuration, 'seconds').humanize()}</div>
                <div>Unique IPs: {totalIPs}</div>
                <br/>
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
