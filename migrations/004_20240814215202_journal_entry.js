/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
  return knex.schema.createTable("journal_entry", (table) => {
    table.increments("id").primary();
    table.integer("userId").unsigned().notNullable();
    table.integer("pickId").unsigned().notNullable();
    table.text("content");
    table.foreign("userId").references("id").inTable("user");
    table.foreign("pickId").references("id").inTable("pick");
  });
};

const down = function (knex) {
  return knex.schema.dropTable("journal_entry");
};
export { up, down };
