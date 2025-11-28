
import {
  Anime,
  AnimeObject,
  AnimeFlowInput,
  AnimeFlowOutput,
} from './types';

import {
  animeRetriever,
  getAnimes,
} from './placesRetriever';
import { ai } from './genkit.config';

import { z } from 'genkit';

export const AnimeSuggestionPromptInput = ai.defineSchema(
  'AnimeSuggestionPromptInput',
  z.object({
    request: z.string(),
    name: z.string(),
    // animeList:z.array(
    //   z.object({
    //     name: z.string(),
    //     description: z.string(),
    //     genre:z.array(z.string())
    //   }),
    // )
  }),
);

const generateList = async (request: string, anime: AnimeObject) => {
  const animeGenerator = await ai.prompt<
    typeof AnimeSuggestionPromptInput,
    z.ZodTypeAny
  >('animeDetails');
  const response = await animeGenerator({
    request,
    name: anime.name,
  });
  const description = response.output;
  if (!description) {
    return null;
  }
  return description;
};

export const animeFlow = ai.defineFlow(
  {
    name: 'animeFlow',
    inputSchema: AnimeFlowInput,
    outputSchema: AnimeFlowOutput,
  },

  async (details) => {
    // const imgDescription = '';
    const imgDescription = await ai.run('imgDescription', async () => {
      if (!details.imageUrls?.length) {
        return '';
      }
      console.log('Generating image description...');
      const images = details.imageUrls.map((url) => ({
        media: { url },
      }));
      const response = await ai.generate({
        model: 'vertexai/gemini-2.5-flash',
        prompt: [
          {
            text: `Guess the anime from the image. Describe it in a paragraph. If you find the name please mention it as well.`,
          },
          ...images,
        ],
      });
      console.log('Image description generated:', response.text);
      return response.text;
    });

    const animes = await ai.run(
      'Retrieve similar anime description',
      { imgDescription, request: details.request },
      async () => {
        const docs = await ai.retrieve({
          retriever: animeRetriever,
          query: `Anime description similar to : ${imgDescription}.`,
          options: {
            limit: 3,
          },
        });
        return docs.map((doc) => {
          const data = doc.toJSON();
          const anime: AnimeObject = {
            name: '',
            description: '',
            rating: 0,
            genre: [],
            ref: '',
            currentStatus: '',
            startedIn: 0,
            numberOfSeasons:0,
            ...data.metadata,
          };
          delete anime.embedding;
          delete anime.desEmbedding;
          return anime;
        });
      },
    );
    const list = await Promise.all(
      animes.map((ani, i) =>
        getAnimes(ani.name),
      ),
    );
    return list.flat().filter((li) => li !== null);
  },
);
