/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
  return knex.schema.createTable("followers", (table) => {
    table.increments("id").primary;
    table.integer("followerId").unsigned();
    table.integer("followedId").unsigned();
    table.foreign("followerId").references("id").inTable("user");
    table.foreign("followedId").references("id").inTable("user");
  });
};

const down = function (knex) {
  return knex.schema.dropTable("followers");
};
export { up, down };
