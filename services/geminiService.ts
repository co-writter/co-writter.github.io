import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type, Modality } from "@google/genai";
import { EBook, GeneratedImage, ChapterOutline } from '../types';
import { GEMINI_TEXT_MODEL, GEMINI_IMAGE_MODEL } from '../constants';

// SECURE: Retrieves the API key from browser's local storage.
const getApiKey = (): string => {
  const apiKey = localStorage.getItem('gemini_api_key');
  if (!apiKey) {
    throw new Error("Gemini API key not found. Please set it in the application settings.");
  }
  return apiKey;
};

// SECURE: Returns an initialized GoogleGenAI client on-demand.
const getGenAIClient = () => new GoogleGenAI({ apiKey: getApiKey() });

// Helper to clean JSON strings from Markdown code blocks
const cleanJsonString = (text: string): string => {
  if (!text) return "{}";
  let cleaned = text.trim();
  const jsonBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (jsonBlockMatch) {
      cleaned = jsonBlockMatch[1];
  }
  const firstBrace = cleaned.search(/[{[]/);
  let lastIndex = -1;
  for (let i = cleaned.length - 1; i >= 0; i--) {
      if (cleaned[i] === '}' || cleaned[i] === ']') {
          lastIndex = i;
          break;
      }
  }
  if (firstBrace !== -1 && lastIndex !== -1 && lastIndex > firstBrace) {
      cleaned = cleaned.substring(firstBrace, lastIndex + 1);
  }
  return cleaned;
};

const writeContentTool: FunctionDeclaration = { name: "write_content", description: "Writes content into the book editor.", parameters: { type: Type.OBJECT, properties: { content: { type: Type.STRING }, summary: { type: Type.STRING } }, required: ["content"] } };
const proposeBlueprintTool: FunctionDeclaration = { name: "propose_blueprint", description: "Propose a book title and chapter outline.", parameters: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, outline: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, summary: { type: Type.STRING } } } } }, required: ["title", "outline"] } };
const generateImageTool: FunctionDeclaration = { name: "generate_image", description: "Generates a visual asset.", parameters: { type: Type.OBJECT, properties: { prompt: { type: Type.STRING } }, required: ["prompt"] } };

export const analyzePdfContent = async (pdfBase64: string): Promise<{title?: string, author?: string, description?: string, genre?: string} | null> => {
    try {
        const ai = getGenAIClient();
        const base64Data = pdfBase64.replace(/^data:application\/pdf;base64,/, "");
        const prompt = `Analyze this PDF. Extract Title, Author, Genre, and a Description (100 words). Return JSON.`;
        const response: GenerateContentResponse = await ai.models.generateContent({ model: GEMINI_TEXT_MODEL, contents: { parts: [ { inlineData: { mimeType: "application/pdf", data: base64Data } }, { text: prompt } ] }, config: { responseMimeType: 'application/json' } });
        return JSON.parse(cleanJsonString(response.text || "{}"));
    } catch (e) { console.error("PDF Analysis failed", e); return null; }
};

export const createStudioSession = (initialContext: string, apiKey: string): Chat | null => {
    try {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        return ai.chats.create({ model: GEMINI_TEXT_MODEL, config: { systemInstruction: `IDENTITY: You are The Architect... CONTEXT: ${initialContext}`, tools: [{ functionDeclarations: [writeContentTool, proposeBlueprintTool, generateImageTool] }] } });
    } catch (e) { console.error("Failed to create studio session", e); return null; }
};

export const suggestBookPrice = async (bookDetails: Pick<EBook, 'genre' | 'title' | 'description'>): Promise<string> => {
  try {
    const ai = getGenAIClient();
    const prompt = `Suggest a competitive market price in INR for an eBook: "${bookDetails.title}" (${bookDetails.genre}). Return ONLY the number.`;
    const response = await ai.models.generateContent({ model: GEMINI_TEXT_MODEL, contents: prompt });
    return response.text?.replace(/[^0-9.]/g, '').trim() || "299";
  } catch (error) { return "299"; }
};

export const generateSceneVisualization = async (sceneDescription: string): Promise<string | null> => {
    const result = await generateBookCover(sceneDescription, 'Concept Art'); 
    if ('imageBytes' in result) { return `data:image/jpeg;base64,${result.imageBytes}`; }
    return null;
}

export const generateBookCover = async (prompt: string, style: string = 'Cinematic', title: string = '', author: string = ''): Promise<GeneratedImage | { error: string }> => {
  try {
    const ai = getGenAIClient();
    const refinedPrompt = `Professional Book Visual. Context: ${title} by ${author}. Request: ${prompt}. Mode: ${style}.`;
    const response = await ai.models.generateContent({ model: GEMINI_IMAGE_MODEL, contents: { parts: [{ text: refinedPrompt }] }, config: { imageConfig: { aspectRatio: '3:4' } } });
    const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (part?.inlineData?.data) { return { imageBytes: part.inlineData.data, prompt: prompt }; }
    return { error: "Generation failed." };
  } catch (error) { return { error: "Service unavailable." }; }
};

export const initializeGeminiChat = async (apiKey: string): Promise<Chat | null> => {
    return createStudioSession("Global Chat Context", apiKey);
};

export const generateSpeech = async (text: string, voiceName: string = 'Kore'): Promise<string | null> => {
  try {
    const ai = getGenAIClient();
    const response = await ai.models.generateContent({ model: "gemini-2.5-flash-preview-tts", contents: { parts: [{ text }] }, config: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } } } });
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (e) { console.error("TTS generation failed", e); return null; }
};

export const transcribeAudio = async (audioBase64: string, mimeType: string): Promise<string | null> => {
  try {
    const ai = getGenAIClient();
    const response = await ai.models.generateContent({ model: GEMINI_TEXT_MODEL, contents: { parts: [ { inlineData: { mimeType: mimeType, data: audioBase64 } }, { text: "Transcribe the spoken audio into text." } ] } });
    return response.text || null;
  } catch (e) { console.error("Transcription failed", e); return null; }
};

export const agenticResearchTopic = async (query: string, isUrl: boolean): Promise<string> => {
    const prompt = isUrl ? `Analyze this content deeply: ${query}` : `Research this topic extensively via Google Search: "${query}".`;
    try {
        const ai = getGenAIClient();
        const response = await ai.models.generateContent({ model: GEMINI_TEXT_MODEL, contents: prompt, config: { tools: [{ googleSearch: {} }] } });
        let text = response.text || "";
        const grounding = response.candidates?.[0]?.groundingMetadata;
        if (grounding?.groundingChunks) { text += "\n\n[References]: " + grounding.groundingChunks.map(c => c.web?.title).join(", "); }
        return text;
    } catch (e) { console.error("Research failed", e); return "Research data unavailable."; }
};

export const agenticPlanBook = async (topic: string, genre: string, context?: string): Promise<{title: string, outline: {title: string, summary: string}[]}> => {
  const prompt = `ARCHITECT AGENT...\nTopic: ${topic}\nGenre: ${genre}\nReturn JSON...`;
  try {
    const ai = getGenAIClient();
    const response = await ai.models.generateContent({ model: GEMINI_TEXT_MODEL, contents: prompt, config: { responseMimeType: 'application/json' } });
    return JSON.parse(cleanJsonString(response.text || '{}'));
  } catch (e) { throw e; }
};

export const agenticWritePageStream = async (bookTitle: string, chapterTitle: string, summary: string, previousContent: string) => {
  const prompt = `WRITER AGENT...\nBook: "${bookTitle}"\nChapter: "${chapterTitle}"\nTask: Write the full chapter content.`;
  try {
    const ai = getGenAIClient();
    const stream = await ai.models.generateContentStream({ model: GEMINI_TEXT_MODEL, contents: prompt });
    return stream;
  } catch (e) { throw e; }
};

export const agenticWritePage = async (bookTitle: string, chapterTitle: string, summary: string, previousContent: string): Promise<string> => {
  const prompt = `WRITER AGENT...\nBook: "${bookTitle}"\nChapter: "${chapterTitle}"\nTask: Write the full chapter content.`;
  try {
    const ai = getGenAIClient();
    const response = await ai.models.generateContent({ model: GEMINI_TEXT_MODEL, contents: prompt });
    return response.text || "";
  } catch (e) { throw e; }
};

export const agenticRefinePage = async (content: string, genre: string): Promise<string> => {
    const prompt = `EDITOR AGENT...\nGenre: ${genre}\nTask: Polish this text.`;
    try {
        const ai = getGenAIClient();
        const response = await ai.models.generateContent({ model: GEMINI_TEXT_MODEL, contents: prompt });
        return response.text || content;
    } catch (e) { return content; }
};

export const generateTitleSuggestions = async (topic: string, genre: string, tone: string) => {
    const res = await agenticPlanBook(topic, genre);
    return [res.title];
}
export const generateBookOutline = async (title: string, genre: string, tone: string) => {
    const res = await agenticPlanBook(title, genre);
    return res.outline;
}
export const generateFullChapterContent = async (chapter: string, title: string, summary: string, tone: string) => {
    return agenticWritePage(title, chapter, summary, "");
}
