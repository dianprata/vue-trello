import Repository from './Repository';

const resource = '/user';

export default {
  signup(payload) {
    return Repository.post(`${resource}/signup`, payload);
  },
  login(payload) {
    return Repository.post(`${resource}/signin`, payload);
  },
};
