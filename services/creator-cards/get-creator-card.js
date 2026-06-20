const fs = require('fs');
const path = require('path');
const validator = require('@app-core/validator');
const { appLogger } = require('@app-core/logger');
const CreatorCard = require('@app/repository/creator-cards');
const { ACCESS_TYPE, CREATOR_CARD_STATUS } = require('@app/models/creator-card');
const { throwAppError, ERROR_CODE } = require('@app-core/errors');
const { CreatorCardsMessages } = require('@app/messages');

const specPath = path.resolve(__dirname, '../../specs/creator-cards/data/get-creator-card.go');
const spec = fs.readFileSync(specPath, 'utf8');
const parsedSpec = validator.parse(spec);

async function getCreatorCard(serviceData, options = {}) {
  const data = validator.validate(serviceData, parsedSpec);
  let result;

  try {
    const card = await CreatorCard.findOne({
      query: { slug: data.slug },
    });

    if (!card || card.deleted) {
      throwAppError(CreatorCardsMessages.CARD_NOT_FOUND, ERROR_CODE.CARD_NOT_FOUND);
    }

    if (card.status === CREATOR_CARD_STATUS.DRAFT) {
      throwAppError(CreatorCardsMessages.CARD_IS_DRAFT, ERROR_CODE.CARD_IS_DRAFT);
    }

    if (card.access_type === ACCESS_TYPE.PRIVATE && !data.access_code) {
      throwAppError(
        CreatorCardsMessages.PRIVATE_ACCESS_CODE_REQUIRED,
        ERROR_CODE.PRIVATE_ACCESS_CODE_REQUIRED
      );
    }

    if (
      card.access_type === ACCESS_TYPE.PRIVATE &&
      card.access_code !== data.access_code
    ) {
      throwAppError(CreatorCardsMessages.INVALID_ACCESS_CODE, ERROR_CODE.INVALID_ACCESS_CODE);
    }

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
      created: card.created,
      updated: card.updated,
      deleted: card.deleted,
    };

    if (result.access_type === ACCESS_TYPE.PUBLIC) {
      delete result.access_code;
    }
  } catch (error) {
    appLogger.errorX(error, 'get-creator-card-error');
    throw error;
  }

  return result;
}

module.exports = getCreatorCard;
