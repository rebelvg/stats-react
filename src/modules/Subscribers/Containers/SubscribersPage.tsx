import React, { Component } from 'react';
import { connect } from 'react-redux';
import humanize from 'humanize-plus';
import moment from 'moment';
import qs from 'qs';
import humanizeDuration from 'humanize-duration';
import { Alert } from 'reactstrap';

import SubscribersWrapper from '../Components/SubscribersWrapper';
import {
  getAction,
  getError,
  getData,
  getLoading,
} from '../../../redux/subscribers';

@connect(
  (state) => ({
    error: getError(state),
    data: getData(state),
    isLoading: getLoading(state),
  }),
  { getAction },
)
class SubscribersPage extends Component<any, any> {
  componentDidMount() {
    this.props.getAction();
  }

  render() {
    const {
      subscribers = [],
      options = {},
      info = {},
      total,
      limit,
      page,
      pages,
    } = this.props.data;
    const { totalBytes = 0, totalDuration = 0, totalIPs = 0 } = info;
    const { search } = this.props.location;
    const { error, isLoading } = this.props;

    if (error) return <Alert color="danger">{error}</Alert>;

    let searchParams = qs.parse(search, { ignoreQueryPrefix: true });

    return (
      <div>
        <button
          onClick={() => {
            this.props.getAction();
          }}
        >
          Refresh
        </button>

        <SubscribersWrapper
          subscribers={subscribers}
          options={options}
          pages={pages}
          getData={this.props.getAction}
          searchParams={searchParams}
          isLoading={isLoading}
        />

        <button
          onClick={() => {
            this.props.getAction();
          }}
        >
          Refresh
        </button>

        <div>Total Traffic: {humanize.fileSize(totalBytes)}</div>
        <div>
          Total Duration:{' '}
          {humanizeDuration(totalDuration * 1000, {
            round: true,
            largest: 3,
          })}
        </div>
        <div>Unique IPs: {totalIPs}</div>
        <br />
        <div>Showing: {subscribers.length}</div>
        <div>Total: {total}</div>
        <div>Limit: {limit}</div>
        <div>Page: {page}</div>
        <div>Pages: {pages}</div>
      </div>
    );
  }
}

export default SubscribersPage;
