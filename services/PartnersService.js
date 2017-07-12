import 'isomorphic-fetch';
import { post } from 'utils/request';

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
      .then(jsonData => jsonData);
  }

  fetchData() {
    return fetch(`${this.opts.apiURL}/api/partners/${this.id}`)
      .then(response => response.json())
      .then(jsonData => jsonData);
  }

  saveData({ type, body, id }) {
    return new Promise((resolve, reject) => {
      post({
        url: `${this.opts.apiURL}/api/partners/${id}`,
        type,
        body,
        headers: [{
          key: 'Content-Type',
          value: 'application/json'
        }],
        onSuccess: (response) => {
          resolve(response);
        },
        onError: (error) => {
          reject(error);
        }
      });
    });
  }
}
