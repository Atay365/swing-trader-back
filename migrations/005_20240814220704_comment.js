/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
  return knex.schema.createTable("comment", (table) => {
    table.increments("id").primary().unique();
    table.integer("pickId").unsigned().notNullable();
    table.integer("userId").unsigned().notNullable();
    table.text("commentText");
    table.timestamp("timestamp");
    table.foreign("pickId").references("id").inTable("pick");
    table.foreign("userId").references("id").inTable("user");
  });
};

const down = function (knex) {
  return knex.schema.dropTable("comment");
};
export { up, down };
