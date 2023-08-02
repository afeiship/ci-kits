import { envname } from '../src';

describe('01-api.envname', () => {
  beforeEach(() => {
    // unset CI_ENVIRONMENT_NAME
    // unset npm_lifecycle_event
    delete process.env.CI_ENVIRONMENT_NAME;
    delete process.env.npm_lifecycle_event;
  });

  test('01.envname -> simulate CI_ENVIRONMENT_NAME', () => {
    process.env.CI_ENVIRONMENT_NAME = 'test';
    expect(envname()).toBe('test');
  });

  test('02.envname -> simulate npm_lifecycle_event with ":"', () => {
    process.env.npm_lifecycle_event = 'build:dev';
    expect(envname(true)).toBe('dev');
    expect(envname()).toBe('development');
  });

  test('03.envname -> simulate npm_lifecycle_event without ":"', () => {
    process.env.npm_lifecycle_event = 'beta';
    expect(envname()).toBe('beta');
  });
});
