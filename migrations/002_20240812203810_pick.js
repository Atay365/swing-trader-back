/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
  return knex.schema.createTable("pick", (table) => {
    table.increments("id").primary();
    table.integer("userId").unsigned().notNullable();
    table.string("stockSymbol").notNullable();
    table.enu("predictionDirection", ["UP", "DOWN"]).notNullable();
    table.timestamp("predictionDate").notNullable();
    table.timestamp("closingDate");
    table.enu("actualResult", ["CORRECT", "INCORRECT", "PENDING"]);
    table.float("priceChange");
    table.integer("scoreImpact");
    table.enu("status", ["PUBLIC", "PRIVATE"]);
    table.text("analysis");
    table.foreign("userId").references("id").inTable("user");
  });
};

const down = function (knex) {
  return knex.schema.dropTable("pick");
};

export { up, down };
