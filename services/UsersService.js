// Utils
import { get } from 'utils/request';


export default class UserService {

  constructor(options) {
    this.opts = options;
  }

  logout() {
    // Get to logout
    get({
      url: `${process.env.CONTROL_TOWER_URL}/auth/logout`,
      withCredentials: true,
      onSuccess: () => {
        try {
          localStorage.removeItem('user');
          window.location.href = `/logout?callbackUrl=${window.location.href}`;
        } catch (err) {
          window.location.href = `/logout?callbackUrl=${window.location.href}`;
        }
      },
      onError: (err) => {
        console.error(err);
      }
    });
  }
}
