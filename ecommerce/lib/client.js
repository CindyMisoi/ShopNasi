// sanity client
import sanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: '7dm954f2',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2021-03-25',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

// images
const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);