import React from 'react';
import PropTypes from 'prop-types';
import { Autobind } from 'es-decorators';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { getIndicators, setFilters } from 'redactions/admin/indicators';

// Selectors
import getFilteredIndicators from 'selectors/admin/indicators';

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

class IndicatorsTable extends React.Component {

  componentDidMount() {
    this.props.setFilters([]);
    this.props.getIndicators();
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
      this.props.setFilters([{ key: 'title', value }]);
    }
  }

  /**
   * HELPERS
   * - getIndicators
   * - getFilteredIndicators
  */
  getIndicators() {
    return this.props.indicators;
  }

  getFilteredIndicators() {
    return this.props.filteredIndicators;
  }

  render() {
    return (
      <div className="c-indicators-table">
        <Spinner className="-light" isLoading={this.props.loading} />

        {this.props.error && (
          <p>Error: {this.props.error}</p>
        )}

        <SearchInput
          input={{
            placeholder: 'Search indicator'
          }}
          link={{
            label: 'New indicator',
            route: 'admin_dashboards_detail',
            params: { tab: 'indicators', id: 'new' }
          }}
          onSearch={this.onSearch}
        />

        {!this.props.error && (
          <CustomTable
            columns={[
              { label: 'Title', value: 'title', td: TitleTD },
              { label: 'Published', value: 'published', td: PublishedTD }
            ]}
            actions={{
              show: true,
              list: [
                { name: 'Edit', route: 'admin_dashboards_detail', params: { tab: 'indicators', subtab: 'edit', id: '{{id}}' }, show: true, component: EditAction },
                { name: 'Remove', route: 'admin_dashboards_detail', params: { tab: 'indicators', subtab: 'remove', id: '{{id}}' }, component: DeleteAction, componentProps: { authorization: this.props.authorization } }
              ]
            }}
            sort={{
              field: 'title',
              value: 1
            }}
            filters={false}
            data={this.getFilteredIndicators()}
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

IndicatorsTable.defaultProps = {
  columns: [],
  actions: {},
  // Store
  indicators: [],
  filteredIndicators: []
};

IndicatorsTable.propTypes = {
  authorization: PropTypes.string,
  // Store
  loading: PropTypes.bool.isRequired,
  indicators: PropTypes.array.isRequired,
  filteredIndicators: PropTypes.array.isRequired,
  error: PropTypes.string,

  // Actions
  getIndicators: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.indicators.indicators.loading,
  indicators: state.indicators.indicators.list,
  filteredIndicators: getFilteredIndicators(state),
  error: state.indicators.indicators.error
});
const mapDispatchToProps = dispatch => ({
  getIndicators: () => dispatch(getIndicators()),
  setFilters: filters => dispatch(setFilters(filters))
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(IndicatorsTable);
