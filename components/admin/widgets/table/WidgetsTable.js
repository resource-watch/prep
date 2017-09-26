import React from 'react';
import PropTypes from 'prop-types';
import { Autobind } from 'es-decorators';

// Redux
import { connect } from 'react-redux';
import { initStore } from 'store';
import { getWidgets, setFilters } from 'redactions/admin/widgets';

// Selectors
import getFilteredWidgets from 'selectors/admin/widgets';

// Components
import Spinner from 'components/ui/Spinner';
import CustomTable from 'components/ui/customtable/CustomTable';
import SearchInput from 'components/ui/SearchInput';

// Table components
import EditAction from './actions/EditAction';
import DeleteAction from './actions/DeleteAction';

// TDs
import TitleTD from './td/TitleTD';
import PublishedTD from './td/PublishedTD';
import EnvironmentTD from './td/EnvironmentTD';
// import DatasetTD from './td/DatasetTD';


class WidgetsTable extends React.Component {

  componentDidMount() {
    this.props.setFilters([]);
    this.props.getWidgets();
  }

  /**
   * Event handler executed when the user search for a dataset
   * @param {string} { value } Search keywords
   */
  @Autobind
  onSearch(value) {
    if (!value.length) {
      this.props.setFilters([]);
    } else {
      this.props.setFilters([{ key: 'name', value }]);
    }
  }

  /**
   * HELPERS
   * - getWidgets
   * - getFilteredWidgets
  */
  getWidgets() {
    return this.props.widgets;
  }

  getFilteredWidgets() {
    return this.props.filteredWidgets;
  }

  render() {
    return (
      <div className="c-widgets-table">
        <Spinner className="-light" isLoading={this.props.loading} />

        {this.props.error && (
          <p>Error: {this.props.error}</p>
        )}

        <SearchInput
          input={{
            placeholder: 'Search widget'
          }}
          link={{
            label: 'New widget',
            route: 'admin_data_detail',
            params: { tab: 'widgets', id: 'new' }
          }}
          onSearch={this.onSearch}
        />

        {!this.props.error && (
          <CustomTable
            columns={[
              { label: 'Title', value: 'name', td: TitleTD },
              // { label: 'Dataset', value: 'dataset', td: DatasetTD },
              { label: 'Environment', value: 'env', td: EnvironmentTD },
              { label: 'Published', value: 'published', td: PublishedTD }
            ]}
            actions={{
              show: true,
              list: [
                { name: 'Edit', route: 'admin_data_detail', params: { tab: 'widgets', subtab: 'edit', id: '{{id}}' }, show: true, component: EditAction },
                { name: 'Remove', route: 'admin_data_detail', params: { tab: 'widgets', subtab: 'remove', id: '{{id}}' }, component: DeleteAction, componentProps: { authorization: this.props.authorization } }
              ]
            }}
            sort={{
              field: 'name',
              value: 1
            }}
            filters={false}
            data={this.getFilteredWidgets()}
            pageSize={20}
            pagination={{
              enabled: true,
              pageSize: 20,
              page: 0
            }}
            onToggleSelectedRow={(ids) => { console.info(ids); }}
            onRowDelete={(id) => { console.info(id); }}
          />
        )}
      </div>
    );
  }
}

WidgetsTable.defaultProps = {
  columns: [],
  actions: {},
  // Store
  widgets: [],
  filteredWidgets: []
};

WidgetsTable.propTypes = {
  // Store
  authorization: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  widgets: PropTypes.array.isRequired,
  filteredWidgets: PropTypes.array.isRequired,
  error: PropTypes.string,

  // Actions
  getWidgets: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authorization: state.user.token,
  loading: state.widgets.widgets.loading,
  widgets: state.widgets.widgets.list,
  filteredWidgets: getFilteredWidgets(state),
  error: state.widgets.widgets.error
});
const mapDispatchToProps = dispatch => ({
  getWidgets: () => dispatch(getWidgets()),
  setFilters: filters => dispatch(setFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(WidgetsTable);
