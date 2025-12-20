import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Button } from 'reactstrap';
import * as jsonwebtoken from 'jsonwebtoken';

const tableConfigTemplate = [
  {
    Header: 'Date',
    accessor: 'createdAt',
    Cell: (props) => {
      return moment(props.value).format('ddd D/MMM/YY HH:mm');
    },
  },
  {
    Header: 'Name',
    accessor: 'name',
    Cell: (props) => {
      const tokenData: any = jsonwebtoken.decode(
        window.localStorage.getItem('token') ?? '',
      );

      const userId = tokenData.userId;

      return props.value + (props.original._id === userId ? ' (You)' : '');
    },
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
    let userId: string;

    try {
      const tokenData: any = jsonwebtoken.decode(
        window.localStorage.getItem('token') ?? '',
      );

      userId = tokenData.userId;
    } catch (error) {}

    return (
      <Button
        outline
        color="primary"
        onClick={() => {
          putUser(props.original._id, {
            isAdmin: !props.value,
          }).catch();
        }}
        block
        disabled={props.original._id === userId}
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
          }).catch();
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
