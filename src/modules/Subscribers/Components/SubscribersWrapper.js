import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import _ from 'lodash';
import createHistory from 'history/createBrowserHistory';
import queryString from 'query-string';

import subscribersTable from '../../Shared/Tables/SubscribersTable';

class SubscribersWrapper extends Component {
    fetchData = (state, instance) => {
        this.props.getData(state.pageSize, state.page, state.filtered, state.sorted);

        const history = createHistory();

        let query = {};

        _.forEach(state.filtered, (filter) => {
            query[filter.id] = filter.value;
        });

        query = queryString.stringify(query);

        history.push({
            pathname: '/streams',
            search: query
        });
    };

    render() {
        const {subscribers = [], options = {}, pages = 1, searchParams = {}, isLoading = false} = this.props;

        let defaultFiltered = _.map(searchParams, (paramKey, paramValue) => {
            return {
                id: paramValue,
                value: paramKey
            };
        });

        return (<div>
            <ReactTable
                columns={subscribersTable(options)}
                data={subscribers}
                onFetchData={this.fetchData}
                pages={pages}
                loading={isLoading}
                defaultPageSize={20}
                minRows={0}
                defaultFiltered={defaultFiltered}
                defaultSorted={[]}
                filterable
                manual
            />
        </div>);
    }
}

export default SubscribersWrapper;
