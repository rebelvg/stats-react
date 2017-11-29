import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import streamsTable from '../../Shared/Tables/StreamsTable';

class StreamWrappers extends Component {
    fetchData = (state, instance) => {
        this.props.getData(state.pageSize, state.page, state.filtered, state.sorted);
    };

    render() {
        const {streams = [], options = {}, pages = 1, isLoading = false} = this.props;

        return (<div>
            <ReactTable
                columns={streamsTable(options)}
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

export default StreamWrappers;
