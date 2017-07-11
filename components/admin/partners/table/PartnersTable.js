import React from 'react';
import PropTypes from 'prop-types';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { getPartners } from 'redactions/admin/partners';

// Selectors
import getFilteredPartners from 'selectors/admin/partners';

// Components
import Spinner from 'components/ui/Spinner';
import CustomTable from 'components/ui/customtable/CustomTable';

// Table components
import EditAction from './actions/EditAction';
import DeleteAction from './actions/DeleteAction';

// TDs
import NameTD from './td/NameTD';
import PublishedTD from './td/PublishedTD';
import FeaturedTD from './td/FeaturedTD';

class PartnersTable extends React.Component {

  componentDidMount() {
    this.props.getPartners();
  }

  getPartners() {
    return this.props.partners;
  }

  render() {
    return (
      <div className="c-partners-table">
        <Spinner className="-light" isLoading={this.props.loading} />

        { this.props.error && (
          <p>Error: {this.props.error}</p>
        ) }

        { !this.props.error && (
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
                { name: 'Edit', route: 'admin_partners_detail', params: { tab: 'partners', subtab: 'edit', id: '{{id}}' }, show: true, component: EditAction },
                { name: 'Remove', route: 'admin_partners_detail', params: { tab: 'partners', subtab: 'remove', id: '{{id}}' }, component: DeleteAction, componentProps: { authorization: this.props.authorization } }
              ]
            }}
            sort={{
              field: 'name',
              value: 1
            }}
            filters={false}
            data={this.getPartners()}
            pageSize={20}
            pagination={{
              enabled: true,
              pageSize: 20,
              page: 0
            }}
            onToggleSelectedRow={(ids) => { console.info(ids); }}
            onRowDelete={(id) => { console.info(id); }}
          />
        ) }
      </div>
    );
  }
}

PartnersTable.defaultProps = {
  columns: [],
  actions: {},
  // Store
  partners: []
};

PartnersTable.propTypes = {
  authorization: PropTypes.string,
  // Store
  loading: PropTypes.bool.isRequired,
  partners: PropTypes.array.isRequired,
  error: PropTypes.string,
  getPartners: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.partners.partners.loading,
  partners: getFilteredPartners(state),
  error: state.partners.partners.error
});
const mapDispatchToProps = dispatch => ({
  getPartners: () => dispatch(getPartners())
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(PartnersTable);
