import React, { Component } from 'react';
import ReactTable from 'react-table';
import _ from 'lodash';
import createHistory from 'history/createBrowserHistory';
import qs from 'qs';

import ipsTable from '../../Shared/Tables/IPsTable';

class IPsWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      pageSize: 20,
      filtered: [],
      sorted: []
    };

    let page = parseInt(props.searchParams.page);

    if (!isNaN(page)) {
      this.state.page = page - 1;
    }

    let pageSize = parseInt(props.searchParams.pageSize);

    if (!isNaN(pageSize)) {
      this.state.pageSize = pageSize;
    }

    this.state.filtered = _.map(props.searchParams.filter, (paramKey, paramValue) => {
      return {
        id: paramValue,
        value: paramKey
      };
    });

    this.state.sorted = _.map(props.searchParams.sort, sort => {
      return {
        desc: _.startsWith(sort, '-'),
        id: _.replace(sort, /^-/, '')
      };
    });

    this.handleFilteredChange = _.debounce(this.handleFilteredChange, 500);
  }

  fetchData = () => {
    this.props.getData(this.state.pageSize, this.state.page, this.state.filtered, this.state.sorted);

    this.buildQuery();
  };

  componentDidMount() {
    this.fetchData();
  }

  buildQuery = () => {
    const history = createHistory();

    let query = {};

    if (this.state.page > 0) {
      query.page = this.state.page + 1;
    }

    if (this.state.pageSize !== 20) {
      query.pageSize = this.state.pageSize;
    }

    _.forEach(this.state.filtered, filter => {
      if (!query.filter) query.filter = {};

      query.filter[filter.id] = filter.value;
    });

    _.forEach(this.state.sorted, sort => {
      if (!query.sort) query.sort = [];

      if (sort.desc) {
        query.sort.push(`-${sort.id}`);
      } else {
        query.sort.push(sort.id);
      }
    });

    query = qs.stringify(query, { arrayFormat: 'brackets' });

    history.push({
      search: query
    });
  };

  handlePageChange = pageIndex => {
    this.setState(
      {
        page: pageIndex
      },
      () => {
        this.fetchData();
      }
    );
  };

  handlePageSizeChange = (pageSize, pageIndex) => {
    this.setState(
      {
        pageSize: pageSize
      },
      () => {
        this.fetchData();
      }
    );
  };

  handleFilteredChange = (column, value) => {
    this.setState(
      {
        page: 0,
        filtered: column
      },
      () => {
        this.fetchData();
      }
    );
  };

  handleSortedChange = (newSorted, column, shiftKey) => {
    this.setState(
      {
        sorted: newSorted
      },
      () => {
        this.fetchData();
      }
    );
  };

  render() {
    const { ips = [], options = {}, pages = 1, isLoading = false } = this.props;

    return (
      <div>
        <ReactTable
          columns={ipsTable(options)}
          page={this.state.page}
          data={ips}
          pages={pages}
          loading={isLoading}
          defaultPageSize={this.state.pageSize}
          minRows={0}
          defaultFiltered={this.state.filtered}
          defaultSorted={this.state.sorted}
          className="-striped -highlight"
          showPaginationTop
          onPageChange={this.handlePageChange}
          onPageSizeChange={this.handlePageSizeChange}
          onFilteredChange={this.handleFilteredChange}
          onSortedChange={this.handleSortedChange}
          filterable
          manual
        />
      </div>
    );
  }
}

export default IPsWrapper;
