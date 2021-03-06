import React from 'react';
import PropTypes from 'prop-types';

// Components
import Icon from 'components/ui/Icon';

class ShareExploreDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  onCopyClick(input) {
    const copyTextarea = (input === 'embed') ? this.embedInput : this.input;
    copyTextarea.select();

    try {
      document.execCommand('copy');
      this.setState({ copied: true });
    } catch (err) {
      console.warn('Oops, unable to copy');
    }
  }

  render() {
    const { datasetId, showEmbed, url } = this.props;
    const embedSt = `<iframe src="https://staging.resourcewatch.org/embed/dataset/${datasetId}" width="100%" height="474px" frameBorder="0"></iframe>`;

    return (
      <div className="c-share-modal-explore">
        <h1 className="c-text -header-normal -thin title">Share</h1>
        <div className="url-container">
          <h5>Public url to share</h5>
          <div className="url-input-div">
            <input ref={(n) => { this.input = n; }} value={url} className="url" readOnly />
            <div className="media">
              <a
                href={`http://www.facebook.com/sharer/sharer.php?u=${url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="icon-facebook" className="-medium" />
              </a>
              <a
                href={`https://twitter.com/share?url=${url}&text=Resource watch, explore datasets`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="icon-twitter" className="-medium" />
              </a>
            </div>
            <div className="copy-button">
              <a tabIndex={0} role="button" onClick={() => this.onCopyClick('url')}>
                Copy link
              </a>
            </div>
          </div>
        </div>
        {showEmbed &&
          <div className="url-container">
            <h5>Code to embed</h5>
            <div className="url-input-div">
              <input
                ref={(n) => { this.embedInput = n; }}
                value={embedSt}
                className="url"
                readOnly
              />
              <div className="copy-button">
                <a tabIndex={0} role="button" onClick={() => this.onCopyClick('embed')}>
                  Copy code
                </a>
              </div>
            </div>
          </div>
        }
        <div className="buttons-div">
          <button className="c-button -secondary" onClick={() => this.props.toggleModal()}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

ShareExploreDetailModal.propTypes = {
  url: PropTypes.string,
  datasetId: PropTypes.string,
  showEmbed: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired
};


export default ShareExploreDetailModal;
