import React from 'react';
import PropTypes from 'prop-types';

// Components
import InsightsIndex from 'components/admin/insights/pages/index';
import InsightsNew from 'components/admin/insights/pages/new';
import InsightsShow from 'components/admin/insights/pages/show';

export default function InsightsTab(props) {
  const { tab, subtab, id } = props;

  return (
    <div className="c-insights-tab">
      {!id &&
        <InsightsIndex tab={tab} subtab={subtab} id={id} />
      }

      {id && id === 'new' &&
        <InsightsNew tab={tab} subtab={subtab} id={id} />
      }

      {id && id !== 'new' &&
        <InsightsShow tab={tab} subtab={subtab} id={id} />
      }
    </div>
  );
}

InsightsTab.propTypes = {
  tab: PropTypes.string,
  id: PropTypes.string,
  subtab: PropTypes.string
};
