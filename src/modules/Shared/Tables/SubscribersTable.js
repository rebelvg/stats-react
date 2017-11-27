import React, {Component} from 'react';
import moment from "moment";
import {Link} from 'react-router-dom';
import humanize from 'humanize-plus';
import _ from 'lodash';

const tableConfig = [
    {
        Header: 'Connect Created',
        accessor: 'connectCreated',
        Cell: (props) => {
            return <Link
                to={'/subscribers/' + props.original._id}>{moment(props.value).format('ddd D/MMM/YY HH:mm')}
            </Link>;
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
            return props.original.isLive ? 'Live!' : moment(props.value).format('ddd D/MMM/YY HH:mm');
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
        Header: 'Protocol',
        accessor: 'protocol',
        minWidth: 40
    },
];

function tableConfigOptions(options = {}) {
    tableConfig[1].Filter = ({filter, onChange}) =>
        <div>
            <input
                list="apps"
                name="apps"
                onChange={event => onChange(event.target.value)}
                style={{width: "100%"}}
                value={filter ? filter.value : ''}
            />
            <datalist id="apps">
                <option value=""></option>
                {_.map(options.apps, (app) => {
                    return <option value={app}>{app}</option>;
                })}
            </datalist>
        </div>;

    tableConfig[2].Filter = ({filter, onChange}) =>
        <div>
            <input
                list="channels"
                name="channels"
                onChange={event => onChange(event.target.value)}
                style={{width: "100%"}}
                value={filter ? filter.value : ''}
            />
            <datalist id="channels">
                <option value=""></option>
                {_.map(options.channels, (channel) => {
                    return <option value={channel}>{channel}</option>;
                })}
            </datalist>
        </div>;

    tableConfig[7].Filter = ({filter, onChange}) =>
        <div>
            <input
                list="countries"
                name="countries"
                onChange={event => onChange(event.target.value)}
                style={{width: "100%"}}
                value={filter ? filter.value : ''}
            />
            <datalist id="countries">
                <option value=""></option>
                {_.map(options.countries, (country) => {
                    return <option value={country}>{country}</option>;
                })}
            </datalist>
        </div>;

    tableConfig[8].Filter = ({filter, onChange}) =>
        <div>
            <input
                list="protocols"
                name="protocols"
                onChange={event => onChange(event.target.value)}
                style={{width: "100%"}}
                value={filter ? filter.value : ''}
            />
            <datalist id="protocols">
                <option value=""></option>
                {_.map(options.protocols, (protocol) => {
                    return <option value={protocol}>{protocol}</option>;
                })}
            </datalist>
        </div>;

    return tableConfig;
}

export default tableConfigOptions;
