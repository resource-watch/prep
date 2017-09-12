import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import TetherComponent from 'react-tether';

// Next components
import { Link } from 'routes';

// Components
import Icon from 'components/ui/Icon';

class DatasetsRelatedContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      widgetsActive: false,
      layersActive: false,
      metadataActive: false,
      vocabulariesActive: false
    };

    // BINDINGS
    this.toggleTooltip = debounce(this.toggleTooltip.bind(this), 50);
  }

  toggleTooltip(specificDropdown, to) {
    this.setState({
      ...{
        widgetsActive: false,
        layersActive: false,
        metadataActive: false,
        vocabulariesActive: false
      },
      [specificDropdown]: to
    });
  }


  render() {
    const { dataset, route } = this.props;
    let numberOfTags = 0;
    let knowledgeGraphVoc = null;
    // Calculate the number of tags for the current dataset
    if (dataset.vocabulary && dataset.vocabulary.length) {
      knowledgeGraphVoc = dataset.vocabulary.find(voc => voc.attributes.name === 'knowledge_graph');
      if (knowledgeGraphVoc) {
        numberOfTags = knowledgeGraphVoc.attributes.tags.length;
      }
    }

    return (
      <div className="c-related-content">
        <ul>
          <li>
            <TetherComponent
              attachment="bottom center"
              constraints={[{
                to: 'window'
              }]}
              targetOffset="-4px 0"
              classes={{
                element: 'c-tooltip'
              }}
            >
              <Link route={route} params={{ tab: 'datasets', id: dataset.id, subtab: 'widgets' }}>
                <a
                  onMouseEnter={() => this.toggleTooltip('widgetsActive', true)}
                  onMouseLeave={() => this.toggleTooltip('widgetsActive', false)}
                >
                  <Icon name="icon-widgets" className="c-icon -small" />
                  <span>{(dataset.widget && dataset.widget.length) || 0}</span>
                </a>
              </Link>

              {this.state.widgetsActive &&
                <div>
                  <span>{(dataset.widget && dataset.widget.length) || 0} widgets</span>
                </div>
              }
            </TetherComponent>
          </li>
          {route !== 'myrw_detail' &&
            <li>
              <TetherComponent
                attachment="bottom center"
                constraints={[{
                  to: 'window'
                }]}
                targetOffset="-4px 0"
                classes={{
                  element: 'c-tooltip'
                }}
              >
                <Link route={route} params={{ tab: 'datasets', id: dataset.id, subtab: 'layers' }}>
                  <a
                    onMouseEnter={() => this.toggleTooltip('layersActive', true)}
                    onMouseLeave={() => this.toggleTooltip('layersActive', false)}
                  >
                    <Icon name="icon-layers" className="c-icon -small" />
                    <span>{(dataset.layer && dataset.layer.length) || 0}</span>
                  </a>
                </Link>

                {this.state.layersActive &&
                  <div>
                    <span>{(dataset.layer && dataset.layer.length) || 0} layers</span>
                  </div>
                }
              </TetherComponent>
            </li>
          }
          <li>
            <TetherComponent
              attachment="bottom center"
              constraints={[{
                to: 'window'
              }]}
              targetOffset="-4px 0"
              classes={{
                element: 'c-tooltip'
              }}
            >
              <Link route={route} params={{ tab: 'datasets', id: dataset.id, subtab: 'metadata' }}>
                <a
                  className={classnames({ '-empty': (!dataset.metadata || !dataset.metadata.length) })}
                  onMouseEnter={() => this.toggleTooltip('metadataActive', true)}
                  onMouseLeave={() => this.toggleTooltip('metadataActive', false)}
                >
                  <Icon name="icon-metadata" className="c-icon -small" />
                  <span>{(dataset.metadata && dataset.metadata.length) || 0}</span>
                </a>
              </Link>

              {this.state.metadataActive &&
                <div>
                  <span>{(dataset.metadata && dataset.metadata.length) || 0} metadata</span>
                </div>
              }
            </TetherComponent>
          </li>
          {route !== 'myrw_detail' &&
            <li>
              <TetherComponent
                attachment="bottom center"
                constraints={[{
                  to: 'window'
                }]}
                targetOffset="-4px 0"
                classes={{
                  element: 'c-tooltip'
                }}
              >
                <Link route={route} params={{ tab: 'datasets', id: dataset.id, subtab: 'tags' }}>
                  <a
                    className={classnames({ '-empty': (!knowledgeGraphVoc) })}
                    onMouseEnter={() => this.toggleTooltip('vocabulariesActive', true)}
                    onMouseLeave={() => this.toggleTooltip('vocabulariesActive', false)}
                  >
                    <Icon name="icon-type" className="c-icon -smaller" />
                    <span>{numberOfTags}</span>
                  </a>
                </Link>

                {this.state.vocabulariesActive &&
                  <div>
                    <span>{numberOfTags} tags</span>
                  </div>
                }
              </TetherComponent>
            </li>
          }
        </ul>
      </div>
    );
  }
}

DatasetsRelatedContent.propTypes = {
  dataset: PropTypes.object,
  route: PropTypes.string
};

export default DatasetsRelatedContent;
