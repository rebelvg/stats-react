import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import axios from 'axios';

const tableConfigTemplate = [
  {
    Header: 'Time Registered',
    accessor: 'createdAt',
    Cell: (props) => {
      return moment(props.value).format('ddd D/MMM/YY HH:mm');
    },
  },
  {
    Header: 'Emails',
    accessor: 'emails',
    Cell: (props) => {
      return (
        props.value
          .map((email) => {
            return email.value;
          })
          .join(' ') +
        (props.original.token === window.localStorage.getItem('token')
          ? ' (You)'
          : '')
      );
    },
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'IP',
    accessor: 'ipUpdated',
  },
  {
    Header: 'Is Admin',
    accessor: 'isAdmin',
    Cell: (props) => {
      return props.value ? 'Yes' : 'No';
    },
    minWidth: 40,
  },
  {
    Header: 'Is Streamer',
    accessor: 'isStreamer',
    minWidth: 40,
  },
];

function tableConfigOptions(putUser) {
  let tableConfig: any = _.cloneDeep(tableConfigTemplate);

  let adminTableColumn = _.find(tableConfig, ['accessor', 'isAdmin']);

  adminTableColumn.Cell = (props) => {
    return (
      <Button
        outline
        color="primary"
        onClick={() => {
          putUser(props.original._id, {
            isAdmin: !props.value,
          });
        }}
        block
        disabled={props.original.token === window.localStorage.getItem('token')}
      >
        {props.value ? 'Yes' : 'No'}
      </Button>
    );
  };

  let streamerTableColumn = _.find(tableConfig, ['accessor', 'isStreamer']);

  streamerTableColumn.Cell = (props) => {
    return (
      <Button
        outline
        color="primary"
        onClick={() => {
          putUser(props.original._id, {
            isStreamer: !props.value,
          });
        }}
        block
      >
        {props.value ? 'Yes' : 'No'}
      </Button>
    );
  };

  return tableConfig;
}

export default tableConfigOptions;
