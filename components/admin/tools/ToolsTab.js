import React from 'react';
import PropTypes from 'prop-types';

// Components
import ToolsIndex from 'components/admin/tools/pages/index';
import ToolsNew from 'components/admin/tools/pages/new';
import ToolsShow from 'components/admin/tools/pages/show';

export default function ToolsTab(props) {
  const { tab, subtab, id } = props;

  return (
    <div className="c-tools-tab">
      {!id &&
        <ToolsIndex tab={tab} subtab={subtab} id={id} />
      }

      {id && id === 'new' &&
        <ToolsNew tab={tab} subtab={subtab} id={id} />
      }

      {id && id !== 'new' &&
        <ToolsShow tab={tab} subtab={subtab} id={id} />
      }
    </div>
  );
}

ToolsTab.propTypes = {
  tab: PropTypes.string,
  id: PropTypes.string,
  subtab: PropTypes.string
};
