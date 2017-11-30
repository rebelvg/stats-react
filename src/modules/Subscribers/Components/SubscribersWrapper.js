import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import _ from 'lodash';
import createHistory from 'history/createBrowserHistory';

import subscribersTable from '../../Shared/Tables/SubscribersTable';

class SubscribersWrapper extends Component {
    fetchData = (state, instance) => {
        this.props.getData(state.pageSize, state.page, state.filtered, state.sorted);
    };

    render() {
        const {subscribers = [], options = {}, pages = 1, searchParams = {}, isLoading = false} = this.props;

        return (<div>
            <ReactTable
                columns={subscribersTable(options)}
                data={subscribers}
                onFetchData={this.fetchData}
                pages={pages}
                loading={isLoading}
                defaultPageSize={20}
                minRows={0}
                defaultFiltered={[]}
                defaultSorted={[]}
                filterable
                manual
            />
        </div>);
    }
}

export default SubscribersWrapper;
