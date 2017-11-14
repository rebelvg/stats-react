import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from "moment";
import {Link} from 'react-router-dom';

import tableConfig from '../../Shared/Tables/SubscribersTable';

class SubscriberWrapper extends Component {
    fetchData = (state, instance) => {
        this.props.getData(state.pageSize, state.page, state.filtered, state.sorted);
    };

    render() {
        const {subscribers = [], pages = 1, isLoading = false} = this.props;

        return (<div>
            <ReactTable
                columns={tableConfig}
                data={subscribers}
                onFetchData={this.fetchData}
                pages={pages}
                loading={isLoading}
                defaultPageSize={20}
                minRows={0}
                filterable
                manual
            />
        </div>);
    }
}

export default SubscriberWrapper;
