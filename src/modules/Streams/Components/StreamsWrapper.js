import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from "moment";
import {Link} from 'react-router-dom';

import tableConfig from '../../Shared/Tables/StreamsTable';

class StreamWrapper extends Component {
    fetchData = (state, instance) => {
        this.props.getData(state.pageSize, state.page, state.filtered, state.sorted);
    };

    render() {
        const {streams = [], pages = 1, isLoading = false} = this.props;

        return (<div>
            <ReactTable
                columns={tableConfig}
                data={streams}
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

export default StreamWrapper;
