import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getAction, getError, getData} from '../../../redux/user';

@connect(
    state => ({
        error: getError(state),
        data: getData(state)
    }),
    {getAction}
)
class UserPage extends Component {
    componentDidMount() {
        this.props.getAction();
    }

    render() {
        const {user} = this.props.data;
        const {error} = this.props;

        if (error) return <div>{error}</div>;

        return (
            <div>
                <pre>
                {JSON.stringify(user, null, 4)}
                </pre>
            </div>
        );
    }
}

export default UserPage;
