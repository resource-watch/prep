import React from 'react';
import PropTypes from 'prop-types';
import { Autobind } from 'es-decorators';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { getTools, setFilters } from 'redactions/admin/tools';

// Selectors
import getFilteredTools from 'selectors/admin/tools';

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

class ToolsTable extends React.Component {

  componentDidMount() {
    this.props.setFilters([]);
    this.props.getTools();
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
   * - getTools
   * - getFilteredTools
  */
  getTools() {
    return this.props.tools;
  }

  getFilteredTools() {
    return this.props.filteredTools;
  }

  render() {
    return (
      <div className="c-tools-table">
        <Spinner className="-light" isLoading={this.props.loading} />

        {this.props.error && (
          <p>Error: {this.props.error}</p>
        )}

        <SearchInput
          input={{
            placeholder: 'Search tool'
          }}
          link={{
            label: 'New tool',
            route: 'admin_tools_detail',
            params: { tab: 'tools', id: 'new' }
          }}
          onSearch={this.onSearch}
        />

        {!this.props.error && (
          <CustomTable
            columns={[
              { label: 'Title', value: 'title', td: TitleTD },
              { label: 'Attribution', value: 'attribution' },
              { label: 'Published', value: 'published', td: PublishedTD }
            ]}
            actions={{
              show: true,
              list: [
                { name: 'Edit', route: 'admin_tools_detail', params: { tab: 'tools', subtab: 'edit', id: '{{id}}' }, show: true, component: EditAction },
                { name: 'Remove', route: 'admin_tools_detail', params: { tab: 'tools', subtab: 'remove', id: '{{id}}' }, component: DeleteAction, componentProps: { authorization: this.props.authorization } }
              ]
            }}
            sort={{
              field: 'title',
              value: 1
            }}
            filters={false}
            data={this.getFilteredTools()}
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

ToolsTable.defaultProps = {
  columns: [],
  actions: {},
  // Store
  tools: [],
  filteredTools: []
};

ToolsTable.propTypes = {
  authorization: PropTypes.string,
  // Store
  loading: PropTypes.bool.isRequired,
  tools: PropTypes.array.isRequired,
  filteredTools: PropTypes.array.isRequired,
  error: PropTypes.string,

  // Actions
  getTools: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.tools.tools.loading,
  tools: state.tools.tools.list,
  filteredTools: getFilteredTools(state),
  error: state.tools.tools.error
});
const mapDispatchToProps = dispatch => ({
  getTools: () => dispatch(getTools()),
  setFilters: filters => dispatch(setFilters(filters))
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(ToolsTable);
