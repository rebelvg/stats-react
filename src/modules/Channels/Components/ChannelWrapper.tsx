import React, { Component } from 'react';
import ReactTable from 'react-table';

class ChannelWrapper extends Component<any, any> {
  render() {
    const { stream = null } = this.props;

    let streams = [];

    if (stream) streams.push(stream);

    return (
      <div>
        <ReactTable
          columns={[
            {
              Header: 'App',
              accessor: 'app',
              minWidth: 40,
            },
            {
              Header: 'Server',
              accessor: 'server',
              minWidth: 40,
            },
            {
              Header: 'Created',
              accessor: 'startTime',
              minWidth: 40,
            },
            {
              Header: 'Viewers',
              accessor: 'viewers',
              minWidth: 40,
            },
            {
              Header: 'Bitrate',
              accessor: 'lastBitrate',
              minWidth: 40,
            },
            {
              Header: 'User',
              accessor: 'userName',
              minWidth: 40,
            },
          ]}
          data={streams}
          showPagination={false}
          minRows={0}
          sortable={false}
        />
      </div>
    );
  }
}

export default ChannelWrapper;
