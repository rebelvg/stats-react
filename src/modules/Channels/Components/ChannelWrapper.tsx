import React, { Component } from 'react';
import ReactTable from 'react-table';

import streamsTable from '../../Shared/Tables/StreamsTable';
import subscribersTable from '../../Shared/Tables/SubscribersTable';

class ChannelWrapper extends Component<any, any> {
  render() {
    const { stream = null, subscribers = [] } = this.props;

    let streams = [];

    if (stream) streams.push(stream);

    return (
      <div>
        <ReactTable
          columns={streamsTable(undefined, ['connectUpdated'])}
          data={streams}
          showPagination={false}
          minRows={0}
          sortable={false}
        />
        {subscribers.length > 0 ? (
          <div>
            <ReactTable
              columns={subscribersTable(undefined, undefined, [
                'connectUpdated',
                'app',
                'channel',
              ])}
              data={subscribers}
              showPagination={false}
              showPageSizeOptions={false}
              minRows={0}
              className="-striped -highlight"
              sortable={false}
            />
            {`Subscribers: ${subscribers.length}`}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default ChannelWrapper;
