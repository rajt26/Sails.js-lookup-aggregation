/**
 * CarDetails.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    model: {
      type: 'string'
    },
    company: {
      type: 'string'
    },
    engine: {
      type: 'string'
    },
    color: {
      type: 'string'
    },
  },

};
