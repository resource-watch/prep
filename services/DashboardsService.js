import 'isomorphic-fetch';
import { get, post, remove } from 'utils/request';

export default class DashboardsService {

  constructor(options = {}) {
    this.opts = options;
  }

  // GET ALL DATA
  fetchAllData() {
    return new Promise((resolve, reject) => {
      get({
        url: `${process.env.BACKOFFICE_API_URL}/api/dashboards/?published=all`,
        headers: [{
          key: 'Content-Type',
          value: 'application/json'
        }, {
          key: 'Authorization',
          value: this.opts.authorization
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

  fetchData(id) {
    return new Promise((resolve, reject) => {
      get({
        url: `${process.env.BACKOFFICE_API_URL}/api/dashboards/${id}`,
        headers: [{
          key: 'Content-Type',
          value: 'application/json'
        }, {
          key: 'Authorization',
          value: this.opts.authorization
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

  saveData({ type, body, id }) {
    return new Promise((resolve, reject) => {
      post({
        url: `${process.env.BACKOFFICE_API_URL}/api/dashboards/${id}`,
        type,
        body,
        headers: [{
          key: 'Content-Type',
          value: 'application/json'
        }, {
          key: 'Authorization',
          value: this.opts.authorization
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

  deleteData(id) {
    return new Promise((resolve, reject) => {
      remove({
        url: `${process.env.BACKOFFICE_API_URL}/api/dashboards/${id}`,
        headers: [{
          key: 'Authorization',
          value: this.opts.authorization
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
