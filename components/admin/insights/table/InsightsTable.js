import React from 'react';
import PropTypes from 'prop-types';
import { Autobind } from 'es-decorators';

// Redux
import { connect } from 'react-redux';
import { initStore } from 'store';
import { getInsights, setFilters } from 'redactions/admin/insights';

// Selectors
import getFilteredInsights from 'selectors/admin/insights';

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
import EmbeddableTD from './td/EmbeddableTD';


class InsightsTable extends React.Component {

  componentDidMount() {
    this.props.setFilters([]);
    this.props.getInsights();
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
   * - getInsights
   * - getFilteredInsights
  */
  getInsights() {
    return this.props.insights;
  }

  getFilteredInsights() {
    return this.props.filteredInsights;
  }

  render() {
    return (
      <div className="c-insights-table">
        <Spinner className="-light" isLoading={this.props.loading} />

        {this.props.error && (
          <p>Error: {this.props.error}</p>
        )}

        <SearchInput
          input={{
            placeholder: 'Search insight'
          }}
          link={{
            label: 'New insight',
            route: 'admin_insights_detail',
            params: { tab: 'insights', id: 'new' }
          }}
          onSearch={this.onSearch}
        />

        {!this.props.error && (
          <CustomTable
            columns={[
              { label: 'Title', value: 'title', td: TitleTD },
              { label: 'Attribution', value: 'attribution' },
              { label: 'Published', value: 'published', td: PublishedTD },
              { label: 'Embeddable', value: 'embeddable', td: EmbeddableTD }
            ]}
            actions={{
              show: true,
              list: [
                { name: 'Edit', route: 'admin_insights_detail', params: { tab: 'insights', subtab: 'edit', id: '{{id}}' }, show: true, component: EditAction },
                { name: 'Remove', route: 'admin_insights_detail', params: { tab: 'insights', subtab: 'remove', id: '{{id}}' }, component: DeleteAction, componentProps: { authorization: this.props.authorization } }
              ]
            }}
            sort={{
              field: 'title',
              value: 1
            }}
            filters={false}
            data={this.getFilteredInsights()}
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

InsightsTable.defaultProps = {
  columns: [],
  actions: {},
  // Store
  insights: [],
  filteredInsights: []
};

InsightsTable.propTypes = {
  authorization: PropTypes.string,
  // Store
  loading: PropTypes.bool.isRequired,
  insights: PropTypes.array.isRequired,
  filteredInsights: PropTypes.array.isRequired,
  error: PropTypes.string,

  // Actions
  getInsights: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.insights.insights.loading,
  insights: state.insights.insights.list,
  filteredInsights: getFilteredInsights(state),
  error: state.insights.insights.error
});
const mapDispatchToProps = dispatch => ({
  getInsights: () => dispatch(getInsights()),
  setFilters: filters => dispatch(setFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(InsightsTable);
