/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
  return knex.schema.createTable("transaction", (table) => {
    table.increments("id").primary();
    table.integer("userId").unsigned().notNullable();
    table.float("amount");
    table.integer("pickId").unsigned().notNullable();
    table.timestamp("transactionDate");
    table.enu("status", ["PENDING", "COMPLETED", "FAILED"]);
    table.foreign("userId").references("id").inTable("user");
    table.foreign("pickId").references("id").inTable("pick");
  });
};

const down = function (knex) {
  return knex.schema.dropTable("transaction");
};
export { up, down };
