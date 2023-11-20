const properties = require("./json/properties.json");
const users = require("./json/users.json");

const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query(
      `SELECT * from users WHERE email = $1`, [email])
    .then(res => {
      if (res.rows.length !== 0) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err.message);
    })
  }

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(
      `SELECT * from users WHERE id = $1`, [id])
    .then(res => {
      if (res.rows.length !== 0) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err.message);
    })
  }

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool
    .query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`, [user.name, user.email, user.password])
    .then(res => {
      return res.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    })
  }

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(
      `SELECT reservations.* , properties.*, avg(rating) as average_rating
      FROM reservations
      JOIN properties ON reservations.property_id = properties.id
      JOIN property_reviews ON properties.id = property_reviews.property_id
      WHERE reservations.guest_id = $1
      GROUP BY properties.id, reservations.id
      ORDER BY reservations.start_date
      LIMIT $2;`, [guest_id, limit])
    .then(res => {
      return res.rows;
    })
    .catch (err => {
      console.log(err.message);
    })
  }

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE LOWER(city) LIKE LOWER($${queryParams.length}) `;
  }
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `AND properties.owner_id = $${queryParams.length} `;
  }
  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += `AND properties.cost_per_night > $${queryParams.length} `;
  }
  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `AND properties.cost_per_night < $${queryParams.length} `;
  }

  // 4

  queryString += `
  GROUP BY properties.id`;
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating)
    queryString += ` HAVING avg(property_reviews.rating) > $${queryParams.length} `
  }
  queryParams.push(limit);
  queryString +=`
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  return pool
  .query(queryString, queryParams)
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};



/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  let queryParams = [];
  property.cost_per_night *= 100;
  for (const prop in property) {
    queryParams.push(property[prop]);
  }
  let query = `
  INSERT INTO properties (title, description, number_of_bedrooms, number_of_bathrooms, parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url, street, country, city, province, post_code, owner_id) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;
  `
  return pool
    .query(query, queryParams)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.log(err.message)
    });
}

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
