import React, {Component} from 'react';
import moment from "moment";
import {Link} from 'react-router-dom';
import humanize from 'humanize-plus';

const tableConfig = [
    {
        Header: 'Connect Created',
        accessor: 'connectCreated',
        Cell: (props) => {
            return <Link to={'/streams/' + props.original._id}>{moment(props.value).format('D/MMM/YY HH:mm')}</Link>;
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
        Header: 'Bitrate',
        accessor: 'bitrate',
        Cell: (props) => {
            return `${props.value} kbps`;
        }
    },
    {
        Header: 'Net Traffic',
        accessor: 'bytes',
        Cell: (props) => {
            return humanize.fileSize(props.value);
        }
    },
    {
        Header: 'Duration',
        accessor: 'duration',
        Cell: (props) => {
            return moment.duration(props.value, 'seconds').humanize();
        }
    },
    {
        Header: 'IP',
        accessor: 'ip'
    },
    {
        Header: 'Total Viewers',
        accessor: 'viewersCount'
    }
];

export default tableConfig;
