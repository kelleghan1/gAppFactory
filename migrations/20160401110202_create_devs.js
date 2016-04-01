
exports.up = function(knex, Promise) {
  return knex.schema.createTable('devs', function (table) {
    table.increments('id');
    table.string('name');
  })
  .createTable('tech', function (table) {
    table.increments('id');
    table.string('name');
  })
  .createTable('goal', function (table) {
    table.increments('id');
    table.string('goal');
  })
  .createTable('p-mang', function(table) {
    table.increments('id');
    table.string('name');
    table.string('s-power');
  })
  .createTable('apps', function(table) {
    table.increments('id');
    table.string('name');
    table.integer('dev-id');
    table.integer('tech-id');
    table.integer('goal-id');
    table.integer('p-mang-id');
    table.integer('cust-id');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  })
  .createTable('cust', function(table) {
    table.increments('id');
    table.string('name');
    table.integer('app-id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users').dropTable('tech').dropTable('goal').dropTable('p-mang').dropTable('apps').dropTable('cust');
};
