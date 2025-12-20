import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import humanize from 'humanize-plus';
import _ from 'lodash';
import humanizeDuration from 'humanize-duration';

const tableConfigTemplate = [
  {
    Header: 'Date',
    accessor: 'createdAt',
    Cell: (props) => {
      return moment(props.value).format('ddd D/MMM/YY HH:mm');
    },
  },
  {
    Header: 'IP',
    accessor: 'ip',
  },
  {
    Header: 'Country',
    accessor: 'api.country',
    Cell: (props) => {
      if (props.original.api.status !== 'success')
        return props.original.api.message;

      return props.original.api.country;
    },
  },
  {
    Header: 'City',
    accessor: 'api.city',
  },
  {
    Header: 'ISP',
    accessor: 'api.isp',
  },
];

function tableConfigOptions(options: any = {}, disableFiltering = []) {
  let tableConfig: any = _.cloneDeep(tableConfigTemplate);

  _.forEach(disableFiltering, (columnName) => {
    let tableColumn = _.find(tableConfig, ['accessor', columnName]);

    if (tableColumn) {
      tableColumn.filterable = false;
    }
  });

  let countriesTableColumn = _.find(tableConfig, ['accessor', 'api.country']);

  if (countriesTableColumn) {
    countriesTableColumn.Filter = ({ filter, onChange }) => (
      <div>
        <input
          list="countries"
          name="countries"
          onChange={(event) => onChange(event.target.value)}
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

  let citiesTableColumn = _.find(tableConfig, ['accessor', 'api.city']);

  if (citiesTableColumn) {
    citiesTableColumn.Filter = ({ filter, onChange }) => (
      <div>
        <input
          list="cities"
          name="cities"
          onChange={(event) => onChange(event.target.value)}
          style={{ width: '100%' }}
          value={filter ? filter.value : ''}
        />
        <datalist id="cities">
          <option value="" />
          {_.map(options.cities, (city, id) => {
            return (
              <option key={id} value={city}>
                {city}
              </option>
            );
          })}
        </datalist>
      </div>
    );
  }

  let ISPsTableColumn = _.find(tableConfig, ['accessor', 'api.isp']);

  if (ISPsTableColumn) {
    ISPsTableColumn.Filter = ({ filter, onChange }) => (
      <div>
        <input
          list="isps"
          name="isps"
          onChange={(event) => onChange(event.target.value)}
          style={{ width: '100%' }}
          value={filter ? filter.value : ''}
        />
        <datalist id="isps">
          <option value="" />
          {_.map(options.ISPs, (isp, id) => {
            return (
              <option key={id} value={isp}>
                {isp}
              </option>
            );
          })}
        </datalist>
      </div>
    );
  }

  let protocolsTableColumn = _.find(tableConfig, ['accessor', 'protocol']);

  if (protocolsTableColumn) {
    protocolsTableColumn.Filter = ({ filter, onChange }) => (
      <div>
        <input
          list="protocols"
          name="protocols"
          onChange={(event) => onChange(event.target.value)}
          style={{ width: '100%' }}
          value={filter ? filter.value : ''}
        />
        <datalist id="protocols">
          <option value="" />
          {_.map(options.protocols, (protocol) => {
            return <option value={protocol}>{protocol}</option>;
          })}
        </datalist>
      </div>
    );
  }

  return tableConfig;
}

export default tableConfigOptions;
