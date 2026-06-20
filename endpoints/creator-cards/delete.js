const { createHandler } = require('@app-core/server');
const deleteCreatorCardService = require('@app/services/creator-cards/delete-creator-card');

module.exports = createHandler({
  path: '/creator-cards/:slug',
  method: 'delete',
  async handler(rc, helpers) {
    const payload = { ...rc.body, slug: rc.params.slug };

    const response = await deleteCreatorCardService(payload);
    return {
      status: helpers.http_statuses.HTTP_200_OK,
      message: 'Creator card deleted successfully',
      data: response,
    };
  },
});
