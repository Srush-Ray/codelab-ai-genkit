/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { z } from 'genkit';

/**
 * Firestore data object for /places collection
 */
export type Place = {
  continent: string;
  country: string;
  embedding?: unknown;
  imageUrl: string;
  knownFor: string;
  name: string;
  ref: string;
  tags: string[];
};

export type AnimeObject = {
  embedding?: unknown;
  desEmbedding?: unknown;
  name: string,
  rating: number,
  startedIn: number,
  numberOfSeasons: number,
  genre: string[],
  description: string,
  currentStatus: string,
  ref: string,
};

/**
 * Firestore data object for /activities collection
 */
export interface Activity {
  description: string;
  destination: string;
  duration: number;
  embedding?: undefined;
  familyFriendly: boolean;
  imageUrl: string;
  locationName: string;
  name: string;
  price: number;
  ref: string;
  timeOfDay: string;
}

export const ItineraryFlowInput = z.object({
  request: z.string(),
  imageUrls: z.array(z.string()).optional(),
});

export type ItineraryFlowInput = z.infer<typeof ItineraryFlowInput>;

export const AnimeFlowInput = z.object({
  request: z.string(),
  imageUrls: z.array(z.string()).optional(),
});

export type AnimeFlowInput = z.infer<typeof AnimeFlowInput>;


const DayActivity = z.object({
  activityRef: z.string(),
  activityTitle: z.string(),
  activityDesc: z.string(),
  imageUrl: z.string(),
});

export type DayActivity = z.infer<typeof DayActivity>;

const Itinerary = z.object({
  day: z.number(),
  date: z.string(),
  planForDay: z.array(DayActivity),
});

export type Itinerary = z.infer<typeof Itinerary>;

export const Destination = z.object({
  itinerary: z.array(Itinerary),
  place: z.string(),
  itineraryName: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  tags: z.array(z.string()),
  itineraryImageUrl: z.string(),
  placeRef: z.string(),
});

export const Anime = z.object({
  name: z.string(),
  rating: z.number(),
  startedIn: z.number(),
  numberOfSeasons: z.number(),
  genre: z.array(z.string()),
  description: z.string(),
  currentStatus: z.string(),
});

export type Destination = z.infer<typeof Destination>;

export const ItineraryFlowOutput = z.array(Destination);

export type ItineraryFlowOutput = z.infer<typeof ItineraryFlowOutput>;


export const AnimeFlowOutput = z.array(Anime);

export type AnimeFlowOutput = z.infer<typeof AnimeFlowOutput>;

export type Anime = z.infer<typeof Anime>;