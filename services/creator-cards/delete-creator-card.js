const fs = require('fs');
const path = require('path');
const validator = require('@app-core/validator');
const { appLogger } = require('@app-core/logger');
const CreatorCard = require('@app/repository/creator-cards');
const { ACCESS_TYPE } = require('@app/models/creator-card');
const { throwAppError, ERROR_CODE } = require('@app-core/errors');
const { CreatorCardsMessages } = require('@app/messages');

const specPath = path.resolve(__dirname, '../../specs/creator-cards/data/delete-creator-card.go');
const spec = fs.readFileSync(specPath, 'utf8');
const parsedSpec = validator.parse(spec);

async function deleteCreatorCard(serviceData, options = {}) {
  const data = validator.validate(serviceData, parsedSpec);
  let result;

  try {
    const card = await CreatorCard.findOne({
      query: { slug: data.slug, creator_reference: data.creator_reference },
    });

    if (!card || card.deleted) {
      throwAppError(CreatorCardsMessages.CARD_NOT_FOUND, ERROR_CODE.CARD_NOT_FOUND);
    }

    // Soft delete
    const now = Date.now();
    await CreatorCard.updateOne({
      query: { _id: card._id },
      updateValues: { deleted: now, updated: now },
    });

    result = {
      id: card._id,
      title: card.title,
      description: card.description,
      slug: card.slug,
      creator_reference: card.creator_reference,
      links: card.links,
      service_rates: card.service_rates,
      status: card.status,
      access_type: card.access_type,
      access_code: card.access_code,
      created: card.created,
      updated: now,
      deleted: now,
    };

    if (result.access_type === ACCESS_TYPE.PUBLIC) {
      result.access_code = null;
    }
  } catch (error) {
    appLogger.errorX(error, 'delete-creator-card-error');
    throw error;
  }

  return result;
}

module.exports = deleteCreatorCard;
