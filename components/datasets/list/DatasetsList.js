import React from 'react';
import PropTypes from 'prop-types';
import { Autobind } from 'es-decorators';

// Redux
import { connect } from 'react-redux';
import { getDatasets, setFilters } from 'redactions/admin/datasets';

// Selectors
import getFilteredDatasets from 'selectors/admin/datasets';

// Components
import Spinner from 'components/ui/Spinner';
import SearchInput from 'components/ui/SearchInput';
import DatasetsListCard from 'components/datasets/list/DatasetsListCard';

class DatasetsList extends React.Component {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  /**
   * UI EVENTS
   * - onSearch
   * - handleDatasetRemoved
  */
  onSearch(value) {
    if (!value.length) {
      this.props.setFilters([]);
    } else {
      this.props.setFilters([{ key: 'name', value }]);
    }
  }

  loadData() {
    const { getDatasetsFilters } = this.props;

    this.props.setFilters([]);
    this.props.getDatasets({
      includes: 'widget,layer,metadata,vocabulary',
      filters: getDatasetsFilters
    });
  }

  @Autobind
  handleDatasetRemoved() {
    this.loadData();
  }

  render() {
    const { datasets, routes, user } = this.props;

    return (
      <div className="c-dataset-list">
        <Spinner className="-light" isLoading={this.props.loading} />

        <SearchInput
          input={{
            placeholder: 'Search dataset'
          }}
          link={{
            label: 'New dataset',
            route: routes.detail,
            params: { tab: 'datasets', id: 'new' }
          }}
          onSearch={this.onSearch}
        />

        <div className="l-row row list">
          {datasets.map(dataset => (
            <div
              className="column list-item small-12 medium-4"
              key={dataset.id}
            >
              <DatasetsListCard
                dataset={dataset}
                routes={routes}
                token={user.token}
                onDatasetRemoved={this.handleDatasetRemoved}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

DatasetsList.defaultProps = {
  routes: {
    index: '',
    detail: ''
  },
  getDatasetsFilters: {},
  // Store
  datasets: []
};

DatasetsList.propTypes = {
  routes: PropTypes.object,
  getDatasetsFilters: PropTypes.object,

  // Store
  user: PropTypes.object,
  datasets: PropTypes.array.isRequired,
  loading: PropTypes.bool,

  // Actions
  getDatasets: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  loading: state.datasets.datasets.loading,
  datasets: getFilteredDatasets(state),
  error: state.datasets.datasets.error
});
const mapDispatchToProps = dispatch => ({
  getDatasets: options => dispatch(getDatasets(options)),
  setFilters: filters => dispatch(setFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(DatasetsList);
