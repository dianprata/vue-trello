import UserRepository from './UserRepository';

const repositories = {
  user: UserRepository,
};

// eslint-disable-next-line import/prefer-default-export
export const RepositoryFactory = {
  get: name => repositories[name],
};
