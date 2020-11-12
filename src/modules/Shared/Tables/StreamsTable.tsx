import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import humanize from 'humanize-plus';
import _ from 'lodash';
import humanizeDuration from 'humanize-duration';

const tableConfigTemplate = [
  {
    Header: 'Connect Created',
    accessor: 'connectCreated',
    Cell: props => {
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
    Header: 'Channel',
    accessor: 'channel',
    minWidth: 40,
  },
  {
    Header: 'Last Update',
    accessor: 'connectUpdated',
    Cell: props => {
      return props.original.isLive
        ? 'Live!'
        : moment(props.value).format('ddd D/MMM/YY HH:mm');
    },
  },
  {
    Header: 'Bitrate',
    accessor: 'bitrate',
    Cell: props => {
      return `${props.value} kbps`;
    },
    minWidth: 40,
  },
  {
    Header: 'Net Traffic',
    accessor: 'bytes',
    Cell: props => {
      return humanize.fileSize(props.value);
    },
    minWidth: 40,
  },
  {
    Header: 'Duration',
    accessor: 'duration',
    Cell: props => {
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
    Header: 'IP',
    accessor: 'ip',
    Cell: props => {
      if (!props.original.location) return props.value;
      if (props.original.location.api.status !== 'success')
        return `${props.value} (${props.original.location.api.message})`;

      return `${props.value} (${props.original.location.api.countryCode}/${props.original.location.api.city})`;
    },
  },
  {
    Header: 'Connections',
    accessor: 'totalConnectionsCount',
    minWidth: 40,
  },
  {
    Header: 'Peak Viewers',
    accessor: 'peakViewersCount',
    minWidth: 40,
  },
];

function tableConfigOptions(options: any = {}) {
  let tableConfig: any = _.cloneDeep(tableConfigTemplate);

  let appsTableColumn = _.find(tableConfig, ['accessor', 'app']);

  if (appsTableColumn) {
    appsTableColumn.Filter = ({ filter, onChange }) => (
      <div>
        <input
          list="apps"
          name="apps"
          onChange={event => onChange(event.target.value)}
          style={{ width: '100%' }}
          value={filter ? filter.value : ''}
        />
        <datalist id="apps">
          <option value="" />
          {_.map(options.apps, (app, id) => {
            return (
              <option key={id} value={app}>
                {app}
              </option>
            );
          })}
        </datalist>
      </div>
    );
  }

  let channelsTableColumn = _.find(tableConfig, ['accessor', 'channel']);

  if (channelsTableColumn) {
    channelsTableColumn.Filter = ({ filter, onChange }) => (
      <div>
        <input
          list="channels"
          name="channels"
          onChange={event => onChange(event.target.value)}
          style={{ width: '100%' }}
          value={filter ? filter.value : ''}
        />
        <datalist id="channels">
          <option value="" />
          {_.map(options.channels, (channel, id) => {
            return (
              <option key={id} value={channel}>
                {channel}
              </option>
            );
          })}
        </datalist>
      </div>
    );
  }

  let countriesTableConfig = _.find(tableConfig, ['accessor', 'ip']);

  if (countriesTableConfig) {
    countriesTableConfig.Filter = ({ filter, onChange }) => (
      <div>
        <input
          list="countries"
          name="countries"
          onChange={event => onChange(event.target.value)}
          style={{ width: '100%' }}
          value={filter ? filter.value : ''}
        />
        <datalist id="countries">
          <option value="" />
          {_.map(options.countries, (country, id) => {
            return (
              <option key={id} value={country}>
                {country}
              </option>
            );
          })}
        </datalist>
      </div>
    );
  }

  return tableConfig;
}

export default tableConfigOptions;
