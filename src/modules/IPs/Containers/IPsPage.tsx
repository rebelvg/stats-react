import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { Alert } from 'reactstrap';

import IPsWrapper from '../Components/IPsWrapper';
import { getAction, getError, getData, getLoading } from '../../../redux/ips';

@connect(
  (state) => ({
    error: getError(state),
    data: getData(state),
    isLoading: getLoading(state),
  }),
  { getAction },
)
class IPsPage extends Component<any, any> {
  componentDidMount() {
    this.props.getAction();
  }

  render() {
    const {
      ips = [],
      options = {},
      info = {},
      total,
      limit,
      page,
      pages,
    } = this.props.data;
    const { totalCountries, totalCities, totalISPs } = info;
    const { search } = this.props.location;
    const { error, isLoading } = this.props;

    if (error) return <Alert color="danger">{error}</Alert>;

    let searchParams = qs.parse(search, { ignoreQueryPrefix: true });

    return (
      <div>
        <button
          onClick={() => {
            this.props.getAction();
          }}
        >
          Refresh
        </button>

        <IPsWrapper
          ips={ips}
          options={options}
          pages={pages}
          getData={this.props.getAction}
          searchParams={searchParams}
          isLoading={isLoading}
        />

        <button
          onClick={() => {
            this.props.getAction();
          }}
        >
          Refresh
        </button>

        <div>Total Counties: {totalCountries}</div>
        <div>Total Cities: {totalCities}</div>
        <div>Total ISPs: {totalISPs}</div>
        <br />
        <div>Showing: {ips.length}</div>
        <div>Total: {total}</div>
        <div>Limit: {limit}</div>
        <div>Page: {page}</div>
        <div>Pages: {pages}</div>
      </div>
    );
  }
}

export default IPsPage;
