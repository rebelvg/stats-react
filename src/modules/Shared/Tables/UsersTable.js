import React, {Component} from 'react';
import moment from 'moment';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {Alert} from 'reactstrap';
import axios from 'axios';

function updateUser(id, data) {
    return axios.put('/api/admin/users/' + id, data, {
        headers: {
            token: window.localStorage.getItem('token')
        }
    })
        .then(res => {
            return res.data.user;
        });
}

const tableConfigTemplate = [
    {
        Header: 'Time Registered',
        accessor: 'createdAt',
        Cell: (props) => {
            return moment(props.value).format('ddd D/MMM/YY HH:mm');
        }
    },
    {
        Header: 'Emails',
        accessor: 'emails',
        Cell: (props) => {
            return props.value.map((email) => {
                return email.value;
            }).join(' ');
        }
    },
    {
        Header: 'Name',
        accessor: 'name'
    },
    {
        Header: 'IP',
        accessor: 'ipUpdated'
    },
    {
        Header: 'Is Admin',
        accessor: 'isAdmin',
        Cell: (props) => {
            return props.value ? 'Yes' : 'No';
        },
        minWidth: 40
    },
    {
        Header: 'Is Streamer',
        accessor: 'isStreamer',
        Cell: (props) => {
            return <Alert color="primary" onClick={() => {
                updateUser(props.original._id, {
                    isStreamer: !props.value
                })
                    .then(user => {
                        console.log(user.isStreamer);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }}>{props.value ? 'Yes' : 'No'}</Alert>;
        },
        minWidth: 40
    }
];

function tableConfigOptions() {
    return _.cloneDeep(tableConfigTemplate);
}

export default tableConfigOptions;
