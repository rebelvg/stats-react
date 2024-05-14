import React, { Component } from 'react';
import ReactTable from 'react-table';
import _ from 'lodash';

import streamsTable from '../../Shared/Tables/StreamsTable';
import subscribersTable from '../../Shared/Tables/SubscribersTable';
import defaultFilterMethod from '../../Shared/Methods/TableFilter';

class StreamWrapper extends Component<any, any> {
  render() {
    const { subscriber = null, streams = [] } = this.props;

    let subscribers = [];

    if (subscriber) subscribers.push(subscriber);

    return (
      <div>
        Subscriber
        <ReactTable
          columns={subscribersTable()}
          data={subscribers}
          showPagination={false}
          minRows={0}
          sortable={false}
        />
        Streams: {streams.length}
        <ReactTable
          columns={streamsTable({
            apps: _.chain(streams).map('app').uniq().value(),
            channels: _.chain(streams).map('channel').uniq().value(),
            countries: _.chain(streams)
              .map('countryCode')
              .compact()
              .uniq()
              .value(),
          })}
          data={streams}
          minRows={0}
          defaultFilterMethod={defaultFilterMethod}
          filterable
        />
      </div>
    );
  }
}

export default StreamWrapper;
