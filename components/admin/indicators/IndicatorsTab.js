import React from 'react';
import PropTypes from 'prop-types';

// Components
import IndicatorsIndex from 'components/admin/indicators/pages/index';
import IndicatorsNew from 'components/admin/indicators/pages/new';
import IndicatorsShow from 'components/admin/indicators/pages/show';

export default function IndicatorsTab(props) {
  const { tab, subtab, id } = props;

  return (
    <div className="c-indicators-tab">
      {!id &&
        <IndicatorsIndex tab={tab} subtab={subtab} id={id} />
      }

      {id && id === 'new' &&
        <IndicatorsNew tab={tab} subtab={subtab} id={id} />
      }

      {id && id !== 'new' &&
        <IndicatorsShow tab={tab} subtab={subtab} id={id} />
      }
    </div>
  );
}

IndicatorsTab.propTypes = {
  tab: PropTypes.string,
  id: PropTypes.string,
  subtab: PropTypes.string
};
