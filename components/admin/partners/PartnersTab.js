import React from 'react';
import PropTypes from 'prop-types';

// Components
import PartnersIndex from 'components/admin/partners/pages/index';
import PartnersNew from 'components/admin/partners/pages/new';
import PartnersShow from 'components/admin/partners/pages/show';

export default function PartnersTab(props) {
  const { tab, subtab, id } = props;

  return (
    <div className="c-partners-tab">
      {!id &&
        <PartnersIndex tab={tab} subtab={subtab} id={id} />
      }

      {id && id === 'new' &&
        <PartnersNew tab={tab} subtab={subtab} id={id} />
      }

      {id && id !== 'new' &&
        <PartnersShow tab={tab} subtab={subtab} id={id} />
      }
    </div>
  );
}

PartnersTab.propTypes = {
  tab: PropTypes.string,
  id: PropTypes.string,
  subtab: PropTypes.string
};
