var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'price-comparer'
    },
    port: 3000,
    db: 'mongodb://localhost:27017/price-comparer-development'
    
  },

  test: {
    root: rootPath,
    app: {
      name: 'price-comparer'
    },
    port: 3000,
    db: 'mongodb://localhost:27017/price-comparer-test'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'price-comparer'
    },
    port: 3000,
    db: 'mongodb://localhost/price-comparer-production'
    
  }
};

module.exports = config[env];
