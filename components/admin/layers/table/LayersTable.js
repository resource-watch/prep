import React from 'react';
import PropTypes from 'prop-types';
import { Autobind } from 'es-decorators';

// Redux
import { connect } from 'react-redux';
import { initStore } from 'store';
import { getLayers, setFilters } from 'redactions/admin/layers';

// Selectors
import getFilteredLayers from 'selectors/admin/layers';

// Components
import Spinner from 'components/ui/Spinner';
import CustomTable from 'components/ui/customtable/CustomTable';
import SearchInput from 'components/ui/SearchInput';

// Table components
import EditAction from './actions/EditAction';
import DeleteAction from './actions/DeleteAction';
import GoToDatasetAction from './actions/GoToDatasetAction';


// TDs
import NameTD from './td/NameTD';

class LayersTable extends React.Component {

  componentDidMount() {
    const { dataset, application } = this.props;
    this.props.setFilters([]);
    this.props.getLayers({ dataset, application });
  }

  /**
   * Event handler executed when the user search for a layer
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

  getLayers() {
    return this.props.layers;
  }

  render() {
    return (
      <div className="c-layer-table">
        <Spinner className="-light" isLoading={this.props.loading} />

        {this.props.error && (
          <p>Error: {this.props.error}</p>
        )}

        <SearchInput
          input={{
            placeholder: 'Search layer'
          }}
          link={{
            label: 'New layer',
            route: 'admin_data_detail',
            params: { tab: 'layers', id: 'new', dataset: this.props.dataset }
          }}
          onSearch={this.onSearch}
        />


        {!this.props.error && (
          <CustomTable
            columns={[
              { label: 'Name', value: 'name', td: NameTD },
              { label: 'Provider', value: 'provider' }
            ]}
            actions={{
              show: true,
              list: [
                { name: 'Edit', route: 'admin_data_detail', params: { tab: 'layers', subtab: 'edit', id: '{{id}}' }, show: true, component: EditAction },
                { name: 'Remove', route: 'admin_data_detail', params: { tab: 'layers', subtab: 'remove', id: '{{id}}' }, component: DeleteAction, componentProps: { authorization: this.props.authorization } },
                { name: 'Go to dataset', route: 'admin_data_detail', params: { tab: 'datasets', subtab: 'edit', id: '{{id}}' }, component: GoToDatasetAction }
              ]
            }}
            sort={{
              field: 'name',
              value: 1
            }}
            filters={false}
            data={this.getLayers()}
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

LayersTable.defaultProps = {
  application: [],
  columns: [],
  actions: {},
  // Store
  layers: []
};

LayersTable.propTypes = {
  dataset: PropTypes.string,
  application: PropTypes.array.isRequired,
  authorization: PropTypes.string,

  // Store
  loading: PropTypes.bool.isRequired,
  layers: PropTypes.array.isRequired,
  error: PropTypes.string,

  // Actions
  getLayers: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.layers.layers.loading,
  layers: getFilteredLayers(state),
  error: state.layers.layers.error
});
const mapDispatchToProps = dispatch => ({
  getLayers: ({ dataset, application }) => dispatch(getLayers({ dataset, application })),
  setFilters: filters => dispatch(setFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(LayersTable);
