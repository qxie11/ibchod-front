import * as prismic from '@prismicio/client';

export const repositoryName = 'iphone-market';

export const createClient = (settings?: prismic.ClientConfig) => {
  return prismic.createClient(repositoryName, settings || {});
};
