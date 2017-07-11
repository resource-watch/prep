import React from 'react';
import PropTypes from 'prop-types';
import { Autobind } from 'es-decorators';

// Next
import { Link } from 'routes';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { setFilters } from 'redactions/admin/partners';

// Components
import PartnersTable from 'components/admin/partners/table/PartnersTable';
import CustomSelect from 'components/ui/CustomSelect';

class PartnersIndex extends React.Component {
  /**
   * Event handler executed when the user search for a partner
   * @param {string} { value } Search keywords
   */
  @Autobind
  onSearch({ value }) {
    if (!value.length) {
      this.props.setFilters([]);
    } else {
      this.props.setFilters([{ key: 'name', value }]);
    }
  }

  /**
   * Return the partner options for the search input
   * @returns {{ label: string, value: string }}
   */
  getSelectOptions() {
    return this.props.partners.map(partner => ({
      label: partner.attributes.name,
      value: partner.id
    }));
  }

  render() {
    const { user } = this.props;
    return (
      <div className="c-partners-index">
        <div className="c-table-actions">
          <CustomSelect
            options={this.getSelectOptions()}
            onKeyPressed={this.onSearch}
            search
            placeholder="Search partner"
            hideList
          />
          <Link route="admin_partners_detail" params={{ tab: 'partners', id: 'new' }}>
            <a className="c-button -secondary">New Page</a>
          </Link>
        </div>
        <PartnersTable
          application={[process.env.APPLICATIONS]}
          authorization={user.token}
        />
      </div>
    );
  }
}

PartnersIndex.propTypes = {
  user: PropTypes.object.isRequired,
  partners: PropTypes.array.isRequired,
  // Redux
  setFilters: PropTypes.func.isRequired
};

PartnersIndex.defaultProps = {
  partners: []
};

const mapStateToProps = ({ partners, user }) => ({
  partners: partners.list,
  user
});

const mapDispatchToProps = dispatch => ({
  setFilters: filters => dispatch(setFilters(filters))
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(PartnersIndex);
