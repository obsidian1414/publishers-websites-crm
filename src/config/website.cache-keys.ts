export const WEBSITE_CACHE_KEYS = {
    all: 'website:all',
    byId: (id: number) => `website:id:${id}`,
    byPublisherId: (publisherId: number) => `website:publisher:${publisherId}`,
};