import 'isomorphic-fetch';

export default class WidgetService {

  constructor(id, options) {
    if (!options) throw new Error('options params is required.');
    if (!options.apiURL || options.apiURL === '') throw new Error('options.apiURL param is required.');

    this.id = id;
    this.opts = options;
  }

  fetchAllData() {
    return fetch(`${this.opts.apiURL}/api/partners`)
      .then(response => response.json())
      .then(jsonData => jsonData.data);
  }

  fetchData() {
    return fetch(`${this.opts.apiURL}/api/partners/${this.id}`)
      .then(response => response.json())
      .then(jsonData => jsonData.data);
  }
}
