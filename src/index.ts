import envname from './libs/env-name';

declare var wx: any;

const CiKits = {
  envname,
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = CiKits;
}

export { envname };
