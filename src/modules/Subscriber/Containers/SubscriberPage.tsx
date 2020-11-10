import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubscriberWrapper from '../Components/SubscriberWrapper';
import { getAction, getError, getData } from '../../../redux/subscriber';

@connect(
  state => ({
    error: getError(state),
    data: getData(state)
  }),
  { getAction }
)
class SubscriberPage extends Component<any, any> {
  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.getAction(id);
  }

  render() {
    const { subscriber = null, streams = [] } = this.props.data;
    const { error } = this.props;

    if (error) return <div>{error}</div>;

    return (
      <div>
        <SubscriberWrapper subscriber={subscriber} streams={streams} />

        <button
          onClick={() => {
            const id = this.props.match.params.id;

            this.props.getAction(id);
          }}
        >
          Refresh
        </button>
      </div>
    );
  }
}

export default SubscriberPage;
