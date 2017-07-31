import React from 'react';
import PropTypes from 'prop-types';

// Components
import WidgetsIndex from 'components/admin/widgets/pages/index';
import WidgetsNew from 'components/admin/widgets/pages/new';
import WidgetsShow from 'components/admin/widgets/pages/show';

export default function WidgetsTab(props) {
  const { tab, subtab, id } = props;

  return (
    <div className="c-widgets-tab">
      {!id &&
        <WidgetsIndex tab={tab} subtab={subtab} id={id} />
      }

      {id && id === 'new' &&
        <WidgetsNew tab={tab} subtab={subtab} id={id} />
      }

      {id && id !== 'new' &&
        <WidgetsShow tab={tab} subtab={subtab} id={id} />
      }
    </div>
  );
}

WidgetsTab.propTypes = {
  tab: PropTypes.string,
  id: PropTypes.string,
  subtab: PropTypes.string
};
