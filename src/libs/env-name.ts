const ENV_HOOKS = {
  prod: 'production',
  dev: 'development',
};

export default () => {
  const { npm_lifecycle_event, CI_ENVIRONMENT_NAME } = process.env;

  // gitlab-ci: environment:name
  if (CI_ENVIRONMENT_NAME) return CI_ENVIRONMENT_NAME;

  // npm run build:dev -> dev
  // npm run build:prod -> prod
  if (npm_lifecycle_event) {
    const parts = npm_lifecycle_event.split(':');
    const env = parts.length > 1 ? parts[1] : parts[0];
    return env || ENV_HOOKS[env];
  }
};
