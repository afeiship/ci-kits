export default () => {
  const { npm_lifecycle_event, CI_ENVIRONMENT_NAME } = process.env;

  // gitlab-ci: environment:name
  if (CI_ENVIRONMENT_NAME) return CI_ENVIRONMENT_NAME;

  // npm run build:dev -> dev
  // npm run build:prod -> prod
  if (npm_lifecycle_event) return npm_lifecycle_event.split(':')[1];
};
