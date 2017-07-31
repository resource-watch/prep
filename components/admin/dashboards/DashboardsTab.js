import React from 'react';
import PropTypes from 'prop-types';

// Components
import DashboardsIndex from 'components/admin/dashboards/pages/index';
import DashboardsNew from 'components/admin/dashboards/pages/new';
import DashboardsShow from 'components/admin/dashboards/pages/show';

export default function DashboardsTab(props) {
  const { tab, subtab, id } = props;

  return (
    <div className="c-dashboards-tab">
      {!id &&
        <DashboardsIndex tab={tab} subtab={subtab} id={id} />
      }

      {id && id === 'new' &&
        <DashboardsNew tab={tab} subtab={subtab} id={id} />
      }

      {id && id !== 'new' &&
        <DashboardsShow tab={tab} subtab={subtab} id={id} />
      }
    </div>
  );
}

DashboardsTab.propTypes = {
  tab: PropTypes.string,
  id: PropTypes.string,
  subtab: PropTypes.string
};
