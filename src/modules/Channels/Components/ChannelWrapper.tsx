import React, { Component } from 'react';
import ReactTable from 'react-table';
import moment from 'moment';
import { Link } from 'react-router-dom';
import humanize from 'humanize-plus';
import humanizeDuration from 'humanize-duration';

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
              Header: 'Connected',
              accessor: 'connectCreated',
              Cell: (props) => {
                return (
                  <Link to={'/streams/' + props.original._id}>
                    {moment(props.value).format('ddd D/MMM/YY HH:mm')}
                  </Link>
                );
              },
            },
            {
              Header: 'App',
              accessor: 'app',
              minWidth: 40,
            },
            {
              Header: 'Duration',
              accessor: 'duration',
              Cell: (props) => {
                return humanizeDuration(props.value * 1000, {
                  round: true,
                  largest: 2,
                  language: 'shortEn',
                  languages: {
                    shortEn: {
                      y: 'y',
                      mo: 'mo',
                      w: 'w',
                      d: 'd',
                      h: 'h',
                      m: 'm',
                      s: 'sec',
                      ms: 'ms',
                    },
                  },
                });
              },
            },
            {
              Header: 'Viewers',
              accessor: 'viewers',
              minWidth: 40,
            },
            {
              Header: 'Bitrate',
              accessor: 'bitrate',
              Cell: (props) => {
                return `${props.value} kbps`;
              },
            },
            {
              Header: 'User',
              accessor: 'userName',
              Cell: (props) => {
                return props.value || 'N/A';
              },
            },
            {
              Header: 'Server',
              accessor: 'server',
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
