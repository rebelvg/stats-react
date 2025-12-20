import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Alert } from 'reactstrap';
import ReactTable from 'react-table';
import moment from 'moment';
import { Link } from 'react-router-dom';
import humanize from 'humanize-plus';
import humanizeDuration from 'humanize-duration';

import { getAction, getError, getData } from '../../../redux/channels';

@connect(
  (state) => ({
    error: getError(state),
    data: getData(state),
  }),
  { getAction },
)
class ChannelsPage extends Component<any, any> {
  timerId;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAction();

    this.timerId = setInterval(() => {
      this.props.getAction();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const { channels = [] } = this.props.data;

    const { error } = this.props;

    if (error) return <Alert color="danger">{error}</Alert>;

    if (channels.length === 0)
      return <Alert color="info">No channels online.</Alert>;

    return (
      <div>
        {channels.map(({ streams }, channelId) => {
          if (streams.length === 0) {
            return (
              <Alert key={channelId} color="info">
                No streams online.
              </Alert>
            );
          }

          return (
            <div key={channelId}>
              {streams.map((stream, streamId) => {
                return (
                  <div key={`${channelId}-${streamId}}`}>
                    <Alert key={channelId} color="success">
                      {stream.server} {stream.app} {stream.channel}
                    </Alert>
                    <ReactTable
                      columns={[
                        {
                          Header: 'Connected',
                          accessor: 'connectCreated',
                          Cell: (props) => {
                            return (
                              <Link to={'/streams/' + props.original._id}>
                                {moment(props.value).format(
                                  'ddd D/MMM/YY HH:mm',
                                )}
                              </Link>
                            );
                          },
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
                          minWidth: 40,
                        },
                        {
                          Header: 'Bitrate',
                          accessor: 'bitrate',
                          Cell: (props) => {
                            return `${props.value} kbps`;
                          },
                          minWidth: 40,
                        },
                        {
                          Header: 'Viewers',
                          accessor: 'subscribers',
                          minWidth: 40,
                          Cell: (props) => {
                            return props.value?.length || 0;
                          },
                        },
                        {
                          Header: 'User',
                          accessor: 'userName',
                          Cell: (props) => {
                            return props.value || 'N/A';
                          },
                          minWidth: 40,
                        },
                      ]}
                      data={[stream]}
                      showPagination={false}
                      minRows={0}
                      sortable={false}
                    />
                    <ReactTable
                      columns={[
                        {
                          Header: 'Connected',
                          accessor: 'connectCreated',
                          Cell: (props) => {
                            return (
                              <Link to={'/subscribers/' + props.original._id}>
                                {moment(props.value).format(
                                  'ddd D/MMM/YY HH:mm',
                                )}
                              </Link>
                            );
                          },
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
                          minWidth: 40,
                        },
                        {
                          Header: 'Bitrate',
                          accessor: 'bitrate',
                          Cell: (props) => {
                            return `${props.value} kbps`;
                          },
                          minWidth: 40,
                        },
                      ]}
                      data={stream.subscribers}
                      showPagination={false}
                      minRows={0}
                      sortable={false}
                    />
                    <br />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ChannelsPage;
