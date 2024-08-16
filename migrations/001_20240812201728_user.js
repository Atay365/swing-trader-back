/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("bio");
    table.string("profilePicture");
    table.integer("totalScore");
    table.json("followers");
    table.json("privatePicks");
    table.json("publicPicks");
    table.json("paymentInfo");
  });
};

const down = function (knex) {
  return knex.schema.dropTable("user");
};

export { up, down };
