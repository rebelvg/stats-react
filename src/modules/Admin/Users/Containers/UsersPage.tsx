import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import AdminHeader from '../../../Shared/Components/AdminHeader/AdminHeader';
import { Alert } from 'reactstrap';

import usersTable from '../../../Shared/Tables/UsersTable';
import {
  getAction,
  getError,
  getData,
  putUser,
} from '../../../../redux/admin/users';

@connect(
  (state) => ({
    error: getError(state),
    data: getData(state),
  }),
  { getAction, putUser },
)
class UsersPage extends Component<any, any> {
  componentDidMount() {
    this.props.getAction();
  }

  render() {
    const { users = [] } = this.props.data;
    const { error } = this.props;

    if (error) return <Alert color="danger">{error}</Alert>;

    return (
      <div>
        <AdminHeader />

        <button
          onClick={() => {
            this.props.getAction();
          }}
        >
          Refresh
        </button>

        <ReactTable
          columns={usersTable(this.props.putUser)}
          data={users}
          showPagination={true}
          showPageSizeOptions={false}
          minRows={0}
          className="-striped -highlight"
          defaultPageSize={100}
          showPaginationTop
        />

        <button
          onClick={() => {
            this.props.getAction();
          }}
        >
          Refresh
        </button>
      </div>
    );
  }
}

export default UsersPage;
