import React, { Component } from 'react';
import { connect } from 'react-redux';
import humanize from 'humanize-plus';
import moment from 'moment';
import qs from 'qs';
import humanizeDuration from 'humanize-duration';

import StreamsWrapper from '../Components/StreamsWrapper';
import {
  getAction,
  getError,
  getData,
  getLoading,
} from '../../../redux/streams';

@connect(
  (state) => ({
    error: getError(state),
    data: getData(state),
    isLoading: getLoading(state),
  }),
  { getAction },
)
class StreamsPage extends Component<any, any> {
  render() {
    const {
      streams = [],
      options = {},
      info = {},
      total,
      limit,
      page,
      pages,
    } = this.props.data;
    const {
      totalBytes = 0,
      totalDuration = 0,
      totalConnections = 0,
      totalPeakViewers = 0,
      totalIPs = 0,
    } = info;
    const { search } = this.props.location;
    const { error, isLoading } = this.props;

    let searchParams = qs.parse(search, { ignoreQueryPrefix: true });

    if (error) return <div>{error}</div>;

    return (
      <div>
        <StreamsWrapper
          streams={streams}
          options={options}
          pages={pages}
          getData={this.props.getAction}
          searchParams={searchParams}
          isLoading={isLoading}
        />

        <div>Total Traffic: {humanize.fileSize(totalBytes)}</div>
        <div>
          Total Duration:{' '}
          {humanizeDuration(totalDuration * 1000, {
            round: true,
            largest: 3,
          })}
        </div>
        <div>Total Connections: {totalConnections}</div>
        <div>Total Peak Viewers: {totalPeakViewers}</div>
        <div>Unique IPs: {totalIPs}</div>
        <br />
        <div>Showing: {streams.length}</div>
        <div>Total: {total}</div>
        <div>Limit: {limit}</div>
        <div>Page: {page}</div>
        <div>Pages: {pages}</div>

        <button
          onClick={() => {
            this.props.getAction();
          }}
        >
          Refresh
        </button>
      </div>
    );
  }
}

export default StreamsPage;
