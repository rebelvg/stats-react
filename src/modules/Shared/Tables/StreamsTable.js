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
        accessor: 'app',
        minWidth: 40
    },
    {
        Header: 'Channel',
        accessor: 'channel',
        minWidth: 40
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
        },
        minWidth: 40
    },
    {
        Header: 'Net Traffic',
        accessor: 'bytes',
        Cell: (props) => {
            return humanize.fileSize(props.value);
        },
        minWidth: 40
    },
    {
        Header: 'Duration',
        accessor: 'duration',
        Cell: (props) => {
            return moment.duration(props.value, 'seconds').humanize();
        },
        minWidth: 40
    },
    {
        Header: 'IP',
        accessor: 'ip',
        Cell: (props) => {
            if (!props.original.location) return props.value;
            if (props.original.location.api.status !== 'success') return `${props.value} (${props.original.location.api.message})`;

            return `${props.value} (${props.original.location.api.countryCode}/${props.original.location.api.city})`;
        }
    },
    {
        Header: 'Connections',
        accessor: 'viewersCount',
        minWidth: 40
    }
];

export default tableConfig;
