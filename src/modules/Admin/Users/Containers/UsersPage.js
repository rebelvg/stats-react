import React, {Component} from 'react';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import AdminHeader from '../../../Shared/Components/AdminHeader/AdminHeader';
import {Alert} from 'reactstrap';

import usersTable from '../../../Shared/Tables/UsersTable';
import {getAction, getError, getData} from '../../../../redux/admin/users';

@connect(
    state => ({
        error: getError(state),
        data: getData(state)
    }),
    {getAction}
)
class UsersPage extends Component {
    componentDidMount() {
        this.props.getAction();
    }

    render() {
        const {users} = this.props.data;
        const {error} = this.props;

        if (error) return <Alert color="danger">{error}</Alert>;

        return (
            <div>
                <AdminHeader/>
                <ReactTable
                    columns={usersTable()}
                    data={users}
                    showPagination={false}
                    showPageSizeOptions={false}
                    minRows={0}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default UsersPage;
