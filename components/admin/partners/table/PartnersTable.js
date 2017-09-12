import React from 'react';
import PropTypes from 'prop-types';
import { Autobind } from 'es-decorators';

// Redux
import { connect } from 'react-redux';
import { initStore } from 'store';
import { getPartners, setFilters } from 'redactions/admin/partners';

// Selectors
import getFilteredPartners from 'selectors/admin/partners';

// Components
import Spinner from 'components/ui/Spinner';
import CustomTable from 'components/ui/customtable/CustomTable';
import SearchInput from 'components/ui/SearchInput';

// Table components
import EditAction from './actions/EditAction';
import DeleteAction from './actions/DeleteAction';

// TDs
import NameTD from './td/NameTD';
import PublishedTD from './td/PublishedTD';
import FeaturedTD from './td/FeaturedTD';

class PartnersTable extends React.Component {

  componentDidMount() {
    this.props.setFilters([]);
    this.props.getPartners();
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
   * - getPartners
   * - getFilteredPartners
  */
  getPartners() {
    return this.props.partners;
  }

  getFilteredPartners() {
    return this.props.filteredPartners;
  }

  render() {
    return (
      <div className="c-partners-table">
        <Spinner className="-light" isLoading={this.props.loading} />

        {this.props.error && (
          <p>Error: {this.props.error}</p>
        )}

        <SearchInput
          input={{
            placeholder: 'Search partner'
          }}
          link={{
            label: 'New partner',
            route: 'admin_resources_detail',
            params: { tab: 'partners', id: 'new' }
          }}
          onSearch={this.onSearch}
        />

        {!this.props.error && (
          <CustomTable
            columns={[
              { label: 'Name', value: 'name', td: NameTD },
              { label: 'Partner type', value: 'partner_type' },
              { label: 'Featured', value: 'featured', td: FeaturedTD },
              { label: 'Published', value: 'published', td: PublishedTD }
            ]}
            actions={{
              show: true,
              list: [
                { name: 'Edit', route: 'admin_resources_detail', params: { tab: 'partners', subtab: 'edit', id: '{{id}}' }, show: true, component: EditAction },
                { name: 'Remove', route: 'admin_resources_detail', params: { tab: 'partners', subtab: 'remove', id: '{{id}}' }, component: DeleteAction, componentProps: { authorization: this.props.authorization } }
              ]
            }}
            sort={{
              field: 'name',
              value: 1
            }}
            filters={false}
            data={this.getFilteredPartners()}
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

PartnersTable.defaultProps = {
  columns: [],
  actions: {},
  // Store
  partners: [],
  filteredPartners: []
};

PartnersTable.propTypes = {
  authorization: PropTypes.string,
  // Store
  loading: PropTypes.bool.isRequired,
  partners: PropTypes.array.isRequired,
  filteredPartners: PropTypes.array.isRequired,
  error: PropTypes.string,

  // Actions
  getPartners: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.partners.partners.loading,
  partners: state.partners.partners.list,
  filteredPartners: getFilteredPartners(state),
  error: state.partners.partners.error
});
const mapDispatchToProps = dispatch => ({
  getPartners: () => dispatch(getPartners()),
  setFilters: filters => dispatch(setFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnersTable);
