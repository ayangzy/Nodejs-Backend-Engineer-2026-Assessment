const { createHandler } = require('@app-core/server');
const getCreatorCardService = require('@app/services/creator-cards/get-creator-card');

module.exports = createHandler({
  path: '/creator-cards/:slug',
  method: 'get',
  async handler(rc, helpers) {
    const payload = { ...rc.query, slug: rc.params.slug };

    const response = await getCreatorCardService(payload);
    return {
      status: helpers.http_statuses.HTTP_200_OK,
      message: 'Creator card retrieved successfully',
      data: response,
    };
  },
});
