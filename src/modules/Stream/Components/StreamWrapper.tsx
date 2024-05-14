import React, { Component } from 'react';
import ReactTable from 'react-table';
import moment from 'moment';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import _ from 'lodash';
import humanize from 'humanize-plus';
import createHistory from 'history/createBrowserHistory';
import qs from 'qs';
import humanizeDuration from 'humanize-duration';

import streamsTable from '../../Shared/Tables/StreamsTable';
import subscribersTable from '../../Shared/Tables/SubscribersTable';
import defaultFilterMethod from '../../Shared/Methods/TableFilter';

const tickFormatter = (tick) => moment.unix(tick).format('ddd HH:mm');

class StreamWrapper extends Component<any, any> {
  constructor(props) {
    super(props);

    const state: any = {};

    state.filtered = _.map(
      props.searchParams.filter,
      (paramKey, paramValue) => {
        return {
          id: paramValue,
          value: paramKey,
        };
      },
    );

    state.sorted = _.map(props.searchParams.sort, (sort) => {
      return {
        desc: _.startsWith(sort, '-'),
        id: _.replace(sort, /^-/, ''),
      };
    });

    this.state = {
      filtered: [],
      sorted: [],
      ...state,
    };

    this.handleFilteredChange = _.debounce(this.handleFilteredChange, 500);
  }

  fetchData = () => {
    this.props.getData(
      this.props.streamId,
      undefined,
      undefined,
      this.state.filtered,
      this.state.sorted,
    );

    this.buildQuery();
  };

  buildQuery = () => {
    const history = createHistory();

    let query: any = {};

    _.forEach(this.state.filtered, (filter) => {
      if (!query.filter) query.filter = {};

      query.filter[filter.id] = filter.value;
    });

    _.forEach(this.state.sorted, (sort) => {
      if (!query.sort) query.sort = [];

      if (sort.desc) {
        query.sort.push(`-${sort.id}`);
      } else {
        query.sort.push(sort.id);
      }
    });

    query = qs.stringify(query, { arrayFormat: 'brackets' });

    history.push({
      search: query,
    });
  };

  handleFilteredChange = (column, value) => {
    this.setState(
      {
        filtered: column,
      },
      () => {
        this.fetchData();
      },
    );
  };

  handleSortedChange = (newSorted, column, shiftKey) => {
    this.setState(
      {
        sorted: newSorted,
      },
      () => {
        this.fetchData();
      },
    );
  };

  render() {
    const {
      stream = null,
      subscribers = [],
      options = {},
      info = {},
      relatedStreams = [],
      events = [],
    } = this.props;
    const {
      totalBytes = 0,
      totalDuration = 0,
      totalPeakViewers = 0,
      totalIPs = 0,
    } = info;

    let streams = [];

    if (stream) streams.push(stream);

    return (
      <div>
        Stream
        <ReactTable
          columns={streamsTable()}
          data={streams}
          showPagination={false}
          minRows={0}
          sortable={false}
        />
        Related Streams: {relatedStreams.length}
        <ReactTable
          columns={streamsTable()}
          data={relatedStreams}
          showPagination={false}
          minRows={0}
          sortable={false}
        />
        <ResponsiveContainer width="100%" height={450}>
          <LineChart
            data={_.map(events, (event) => {
              event.unixTime = moment(event.time).unix();
              event.subscribersCount = event.subscribers.length;
              return event;
            })}
            margin={{ top: 20, right: 50, left: 5, bottom: 5 }}
          >
            <XAxis
              dataKey="unixTime"
              tickFormatter={tickFormatter}
              type="number"
              scale="time"
              domain={['dataMin', 'dataMax']}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => moment.unix(value).format('ddd HH:mm')}
            />
            <Legend />
            <Line
              name="Viewers"
              type="stepAfter"
              dataKey="subscribersCount"
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
        Subscribers: {subscribers.length}
        <div>Total Traffic: {humanize.fileSize(totalBytes)}</div>
        <div>
          Total Duration:{' '}
          {humanizeDuration(totalDuration * 1000, {
            round: true,
            largest: 3,
          })}
        </div>
        <div>Total Peak Viewers: {totalPeakViewers}</div>
        <div>Unique IPs: {totalIPs}</div>
        <ReactTable
          columns={subscribersTable(options, ['app', 'channel'])}
          data={subscribers}
          showPagination={false}
          showPageSizeOptions={false}
          minRows={0}
          defaultFiltered={this.state.filtered}
          defaultSorted={this.state.sorted}
          className="-striped -highlight"
          onFilteredChange={this.handleFilteredChange}
          onSortedChange={this.handleSortedChange}
          filterable
          manual
        />
      </div>
    );
  }
}

export default StreamWrapper;
