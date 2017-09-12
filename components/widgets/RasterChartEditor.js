import React from 'react';
import PropTypes from 'prop-types';
import { Autobind } from 'es-decorators';

// Redux
import { connect } from 'react-redux';
import { setBand } from 'redactions/widgetEditor';
import { toggleModal } from 'redactions/modal';

// Components
import Select from 'components/form/SelectInput';
import Spinner from 'components/ui/Spinner';
import SaveWidgetModal from 'components/modal/SaveWidgetModal';

// Services
import RasterService from 'services/RasterService';

class RasterChartEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false, // Whether the component is loading
      error: null, // Whether an error happened
      bands: [] // List of the name of the bands
    };

    this.rasterService = new RasterService(props.dataset, props.tableName, props.provider);
  }

  componentDidMount() {
    this.fetchBandNames();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataset !== this.props.dataset
      || nextProps.tableName !== this.props.tableName) {
      this.rasterService = new RasterService(
        nextProps.dataset,
        nextProps.tableName,
        nextProps.provider
      );
      this.fetchBandNames();
    }
  }

  /**
   * Event handler executed when the user selects a band
   * @param {string} band 
   */
  @Autobind
  onChangeBand(band) {
    this.props.setBand(band);
  }

  /**
   * Event handler executed when the user clicks the
   * Save button
   */
  @Autobind
  onClickSaveWidget() {
    const options = {
      children: SaveWidgetModal,
      childrenProps: {
        dataset: this.props.dataset,
        datasetType: 'raster',
        datasetProvider: this.props.provider,
        tableName: this.props.tableName
      }
    };

    this.props.toggleModal(true, options);
  }

  /**
   * Event handler executed when the user clicks the
   * Save button while editing an existing widget
   */
  @Autobind
  onClickUpdateWidget() {
    this.props.onUpdateWidget();
  }

  /**
   * Fetch the name of the bands and set it in the state
   */
  fetchBandNames() {
    this.setState({ loading: true, error: null });
    this.rasterService.getBandNames()
      .then(bands => this.setState({ bands }))
      .catch(({ message }) => this.setState({ error: message }))
      .then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading, bands, error } = this.state;
    const { band, mode, showSaveButton } = this.props;

    return (
      <div className="c-raster-chart-editor">
        <div className="content">
          <h5>Bands { loading && <Spinner isLoading className="-light -small -inline" /> }</h5>
          { error && <div className="error"><span>Error:</span> {error}</div> }
          { !error && (
            <Select
              properties={{
                name: 'raster-bands',
                default: band
              }}
              options={bands.map(b => ({ label: b, value: b }))}
              onChange={this.onChangeBand}
            />
          ) }
        </div>
        <div className="buttons">
          <span /> {/* Help align the button to the right */}
          {showSaveButton && mode === 'save' && band &&
            <button
              className="c-button -primary"
              onClick={this.onClickSaveWidget}
            >
              Save widget
            </button>
          }
          {showSaveButton && mode === 'update' && band &&
            <button
              className="c-button -primary"
              onClick={this.onClickUpdateWidget}
            >
              Save widget
            </button>
          }
        </div>
      </div>
    );
  }
}

RasterChartEditor.propTypes = {
  dataset: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['save', 'update']),
  showSaveButton: PropTypes.bool,
  onUpdateWidget: PropTypes.func,

  // REDUX
  band: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
  setBand: PropTypes.func.isRequired
};

RasterChartEditor.defaultProps = {
  onUpdateWidget: () => {}
};

const mapStateToProps = ({ widgetEditor }) => ({
  band: widgetEditor.band
});

const mapDispatchToProps = dispatch => ({
  toggleModal: (...args) => dispatch(toggleModal(...args)),
  setBand: band => dispatch(setBand(band))
});

export default connect(mapStateToProps, mapDispatchToProps)(RasterChartEditor);
