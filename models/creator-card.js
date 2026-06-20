const { ModelSchema, SchemaTypes, DatabaseModel } = require('@app-core/mongoose');

const modelName = 'creator_cards';

const CREATOR_CARD_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
};

const ACCESS_TYPE = {
  PUBLIC: 'public',
  PRIVATE: 'private',
};

/**
 * @typedef {Object} ModelSchema
 * @property {String} _id
 * @property {String} title
 * @property {String} description
 * @property {String} slug
 * @property {String} creator_reference
 * @property {Array} links
 * @property {Object} service_rates
 * @property {String} status
 * @property {String} access_type
 * @property {String} access_code
 * @property {Number} created
 * @property {Number} updated
 * @property {Number} deleted
 */

const schemaConfig = {
  _id: { type: SchemaTypes.ULID, required: true },
  title: { type: SchemaTypes.String, required: true },
  description: { type: SchemaTypes.String },
  slug: { type: SchemaTypes.String, unique: true, index: true },
  creator_reference: { type: SchemaTypes.String, required: true, index: true },
  links: { type: SchemaTypes.Array },
  service_rates: { type: SchemaTypes.Mixed },
  status: { type: SchemaTypes.String, required: true, index: true },
  access_type: { type: SchemaTypes.String },
  access_code: { type: SchemaTypes.String, index: true },
  created: { type: SchemaTypes.Number, required: true },
  updated: { type: SchemaTypes.Number, required: true },
  deleted: { type: SchemaTypes.Number },
};

const modelSchema = new ModelSchema(schemaConfig, { collection: modelName });

const CreatorCard = DatabaseModel.model(modelName, modelSchema);

CreatorCard.CREATOR_CARD_STATUS = CREATOR_CARD_STATUS;
CreatorCard.ACCESS_TYPE = ACCESS_TYPE;

/** @type {ModelSchema} */
module.exports = CreatorCard;
