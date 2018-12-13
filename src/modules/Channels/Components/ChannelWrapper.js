import React, { Component } from 'react';
import ReactTable from 'react-table';

import streamsTable from '../../Shared/Tables/StreamsTable';
import subscribersTable from '../../Shared/Tables/SubscribersTable';

class ChannelWrapper extends Component {
  render() {
    const { stream = null, subscribers = [] } = this.props;

    let streams = [];

    if (stream) streams.push(stream);

    return (
      <div>
        Stream
        <ReactTable columns={streamsTable()} data={streams} showPagination={false} minRows={0} sortable={false} />
        Subscribers: {subscribers.length}
        <ReactTable
          columns={subscribersTable()}
          data={subscribers}
          showPagination={false}
          showPageSizeOptions={false}
          minRows={0}
          className="-striped -highlight"
          sortable={false}
        />
      </div>
    );
  }
}

export default ChannelWrapper;
