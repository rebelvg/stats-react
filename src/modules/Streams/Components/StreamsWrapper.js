import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import _ from 'lodash';
import createHistory from 'history/createBrowserHistory';
import queryString from 'query-string';

import streamsTable from '../../Shared/Tables/StreamsTable';

class StreamsWrapper extends Component {
    fetchData = (state, instance) => {
        this.props.getData(state.pageSize, state.page, state.filtered, state.sorted);

        const history = createHistory();

        let query = {};

        if (state.page > 0) {
            query.page = state.page + 1;
        }

        _.forEach(state.filtered, (filter) => {
            query[filter.id] = filter.value;
        });

        _.forEach(state.sorted, (sort) => {
            if (!query.sort) query.sort = [];

            if (sort.desc) {
                query.sort.push(`-${sort.id}`);
            } else {
                query.sort.push(sort.id);
            }
        });

        query = queryString.stringify(query, {
            arrayFormat: 'bracket'
        });

        history.push({
            pathname: '/streams',
            search: query
        });
    };

    render() {
        const {streams = [], options = {}, pages = 1, searchParams = {}, isLoading = false} = this.props;

        let sorts = searchParams.sort;

        delete searchParams.sort;

        let defaultFiltered = _.map(searchParams, (paramKey, paramValue) => {
            return {
                id: paramValue,
                value: paramKey
            };
        });

        let defaultSorted = _.map(sorts, (sort) => {
            return {
                desc: _.startsWith(sort, '-'),
                id: _.replace(sort, /^-/, '')
            }
        });

        return (<div>
            <ReactTable
                columns={streamsTable(options)}
                data={streams}
                onFetchData={this.fetchData}
                pages={pages}
                loading={isLoading}
                defaultPageSize={20}
                minRows={0}
                defaultFiltered={defaultFiltered}
                defaultSorted={defaultSorted}
                filterable
                manual
            />
        </div>);
    }
}

export default StreamsWrapper;
