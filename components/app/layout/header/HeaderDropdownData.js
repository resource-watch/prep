import React from 'react';
import { Link } from 'routes';

// Components
import TetherComponent from 'react-tether';

export default function HeaderDropdownData(props) {
  return (
    <TetherComponent
      attachment="top center"
      constraints={[{
        to: 'window'
      }]}
      targetOffset="-4px 0"
      classes={{
        element: 'c-header-dropdown'
      }}
    >
      {/* First child: This is what the item will be tethered to */}
      <Link route="data" >
        <a
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        >
          Data
        </a>
      </Link>
      {/* Second child: If present, this item will be tethered to the the first child */}
      {props.active &&
        <ul
          className="header-dropdown-list"
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        >
          <li className="header-dropdown-list-item">
            <Link route="explore">
              <a>Explore Datasets</a>
            </Link>
          </li>
          <li className="header-dropdown-list-item">
            <Link route="dashboards">
              <a>Dashboards</a>
            </Link>
          </li>
          <li className="header-dropdown-list-item">
            <Link route="pulse">
              <a>Planet Pulse</a>
            </Link>
          </li>
          <li className="header-dropdown-list-item">
            <Link route="get_involved">
              <a>Explore Tools</a>
            </Link>
          </li>
        </ul>
      }
    </TetherComponent>
  );
}

HeaderDropdownData.propTypes = {
  active: React.PropTypes.bool,
  onMouseEnter: React.PropTypes.func,
  onMouseLeave: React.PropTypes.func
};
