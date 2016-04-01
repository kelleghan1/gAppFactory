module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/knex-auth',
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: './seeds'
    }
  }

};
