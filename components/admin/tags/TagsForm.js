import React from 'react';
import PropTypes from 'prop-types';
import { Autobind } from 'es-decorators';
import { toastr } from 'react-redux-toastr';
import Graph from 'react-graph-vis';

// Components
import Spinner from 'components/ui/Spinner';
import Field from 'components/form/Field';
import Select from 'components/form/SelectInput';

// Services
import GraphService from 'services/GraphService';

const graphOptions = {
  height: '100%',
  layout: {
    hierarchical: false
  },
  edges: {
    color: '#000000'
  }
};

class TagsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      selectedTags: [],
      inferredTags: [],
      graph: null,
      loadingDatasetTags: false,
      loadingAllTags: false,
      loadingInferredTags: false
    };

    this.graphService = new GraphService({ apiURL: process.env.WRI_API_URL });
  }

  /**
   * COMPONENT LIFECYCLE
   * - componentDidMount
  */
  componentDidMount() {
    this.loadAllTags();
    this.loadKnowledgeGraph();
    this.loadDatasetTags();
  }

  loadDatasetTags() {
    this.setState({ loadingDatasetTags: true });
    this.graphService.getDatasetTags(this.props.dataset)
      .then((response) => {
        const knowledgeGraphVoc = response.find(elem => elem.id === 'knowledge_graph');
        const datasetTags = knowledgeGraphVoc ? knowledgeGraphVoc.attributes.tags : [];
        this.setState({
          selectedTags: datasetTags,
          loadingDatasetTags: false
        }, () => this.loadInferredTags());
      })
      .catch((err) => {
        toastr.error('Error loading the dataset tags');
        console.error(err);
        this.setState({ loadingDatasetTags: false });
      });
  }

  loadKnowledgeGraph() {
    // Topics selector
    fetch(new Request('/static/data/KnowledgeGraph.json', { credentials: 'same-origin' }))
      .then(response => response.json())
      .then((data) => {
        this.knowledgeGraph = {
          edges: data.edges.map(elem => ({
            from: elem.source,
            to: elem.target,
            label: elem.relType,
            font: { size: 8 } })),
          nodes: data.nodes.map(elem => ({ id: elem.id, label: elem.label }))
        };
      });
  }

  loadSubGraph() {
    const { inferredTags, selectedTags } = this.state;
    this.setState({
      graph: {
        edges: this.knowledgeGraph.edges
          .filter(elem => inferredTags.find(tag => tag.id === elem.to)),
        nodes: this.knowledgeGraph.nodes
          .filter(elem => inferredTags.find(tag => tag.id === elem.id))
          .map(elem => ({ ...elem, color: selectedTags.find(tag => tag === elem.id) ? '#c32d7b' : '#F4F6F7' }))
      }
    });
  }

  /**
   * UI EVENTS
   * - handleSubmit
   * - handleTagsChange
  */
  @Autobind
  handleSubmit() {
    const { dataset, user } = this.props;
    const { selectedTags } = this.state;

    this.setState({ loading: true });
    this.graphService.updateDatasetTags(dataset, selectedTags, user.token)
      .then(() => {
        toastr.success('Success', 'Tags updated successfully');
        this.setState({ loading: false });
      })
      .catch((err) => {
        toastr.error('Error updating the tags');
        console.error(err);
        this.setState({ loading: false });
      });
  }
  @Autobind
  handleTagsChange(value) {
    this.setState({ selectedTags: value },
      () => this.loadInferredTags());
  }

  /**
  * HELPER FUNCTIONS
  * - loadAllTags
  * - loadInferredTags
  */
  loadAllTags() {
    this.setState({ loadingAllTags: true });
    this.graphService.getAllTags()
      .then((response) => {
        this.setState({
          loadingAllTags: false,
          tags: response.map(val => ({ label: val.label, value: val.id }))
        });
      })
      .catch((err) => {
        this.setState({ loadingAllTags: false });
        toastr.error('Error loading tags');
        console.error(err);
      });
  }
  loadInferredTags() {
    const { selectedTags } = this.state;
    this.setState({
      loadingInferredTags: true
    });
    if (selectedTags.length > 0) {
      this.graphService.getInferredTags(selectedTags)
        .then((response) => {
          this.setState({
            loadingInferredTags: false,
            inferredTags: response
          }, () => this.loadSubGraph());
        })
        .catch((err) => {
          this.setState({ loadingInferredTags: false });
          toastr.error('Error loading inferred tags');
          console.error(err);
        });
    } else {
      this.setState({
        inferredTags: [],
        loadingInferredTags: false
      });
    }
  }

  render() {
    const { tags, selectedTags, inferredTags, graph, loadingDatasetTags,
      loadingAllTags, loadingInferredTags } = this.state;
    return (
      <div className="c-tags-form">
        <Spinner
          className="-light"
          isLoading={loadingAllTags || loadingDatasetTags}
        />
        <Field
          onChange={value => this.handleTagsChange(value)}
          options={tags}
          properties={{
            name: 'tags',
            label: 'Tags',
            multi: true,
            value: selectedTags,
            default: selectedTags
          }}
        >
          {Select}
        </Field>
        <h5>Inferred tags:</h5>
        <div className="inferred-tags">
          {inferredTags.map(tag =>
            (<div
              className="tag"
              key={tag.id}
            >
              {tag.label}
            </div>)
          )}
        </div>
        <div className="graph-div">
          <Spinner
            className="-light -relative"
            isLoading={loadingInferredTags}
          />
          {graph &&
            <Graph
              graph={graph}
              options={graphOptions}
            />
          }
        </div>
        <div className="actions-div">
          <button
            type="submit"
            className="c-btn -a"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

TagsForm.propTypes = {
  dataset: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default TagsForm;
