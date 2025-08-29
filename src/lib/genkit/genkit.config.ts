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

import { genkit } from 'genkit';
import { enableFirebaseTelemetry } from '@genkit-ai/firebase';
import { vertexAI } from '@genkit-ai/vertexai';

const firebaseConfig = {
  apiKey: "AIzaSyAKNn_Nbu9knMLtWQAroSPx55w0AS14mLc",
  authDomain: "codelab-compass-genkit.firebaseapp.com",
  projectId: "codelab-compass-genkit",
  storageBucket: "codelab-compass-genkit.firebasestorage.app",
  messagingSenderId: "64380703802",
  appId: "1:64380703802:web:f660b901a3c8e962add103"
};


export const getProjectId = () => firebaseConfig.projectId;

enableFirebaseTelemetry({ projectId: getProjectId() });

export const ai = genkit({
  plugins: [
    vertexAI({
      projectId: getProjectId(),
      location: 'us-central1',
    }),
  ],
});
