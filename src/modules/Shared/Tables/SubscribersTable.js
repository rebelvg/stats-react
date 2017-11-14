import React, {Component} from 'react';
import moment from "moment";
import {Link} from 'react-router-dom';

const tableConfig = [
    {
        Header: 'Connect Created',
        accessor: 'connectCreated',
        Cell: (props) => {
            return <Link
                to={'/subscribers/' + props.original._id}>{moment(props.value).format('D/MMM/YY HH:mm')}</Link>;
        }
    },
    {
        Header: 'App',
        accessor: 'app'
    },
    {
        Header: 'Channel',
        accessor: 'channel'
    },
    {
        Header: 'Last Update',
        accessor: 'connectUpdated',
        Cell: (props) => {
            return props.original.isLive ? 'Live!' : moment(props.value).format('D/MMM/YY HH:mm');
        }
    },
    {
        Header: 'Bitrate (kbps)',
        accessor: 'bitrate'
    },
    {
        Header: 'MBs',
        accessor: 'bytes',
        Cell: (props) => {
            return Math.ceil(props.value / 1024 / 1024);
        }
    },
    {
        Header: 'Duration (Minutes)',
        accessor: 'duration',
        Cell: (props) => {
            return Math.ceil(props.value / 60);
        }
    },
    {
        Header: 'IP',
        accessor: 'ip'
    }
];

export default tableConfig;
