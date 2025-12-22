
import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type, Modality } from "@google/genai";
import { EBook, GeneratedImage, ChapterOutline } from '../types';
import { GEMINI_TEXT_MODEL, GEMINI_IMAGE_MODEL } from '../constants';

// Lazy initialization to prevent top-level crashes
let aiInstance: GoogleGenAI | null = null;
const getAI = () => {
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY || "" });
  }
  return aiInstance;
};

// Helper to clean JSON strings from Markdown code blocks
const cleanJsonString = (text: string): string => {
  if (!text) return "{}";
  let cleaned = text.trim();

  // 1. Try to extract from markdown code blocks first
  const jsonBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (jsonBlockMatch) {
    cleaned = jsonBlockMatch[1];
  }

  // 2. If it still looks like it has extra text, try to find the outer braces or brackets
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

// --- AGENT TOOLS ---

const writeContentTool: FunctionDeclaration = {
  name: "write_content",
  description: "Writes content directly into the book editor. Use this to WRITE new prose, FIX existing text, or APPEND text. The content argument will completely replace the current editor content, so be sure to include the full text if you are just making a small edit. DO NOT use this to insert images directly as base64.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      content: { type: Type.STRING, description: "The FULL markdown content to put into the editor." },
      summary: { type: Type.STRING, description: "A very brief 1-word status (e.g. 'Writing', 'Fixing', 'Analyzing')." }
    },
    required: ["content"]
  }
};

const proposeBlueprintTool: FunctionDeclaration = {
  name: "propose_blueprint",
  description: "Propose a book title and chapter outline to the user for approval. Use this when the user asks to start a new book, create a plan, or brainstorm a structure.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "The proposed title of the book." },
      outline: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Chapter title" },
            summary: { type: Type.STRING, description: "Brief summary of chapter" }
          }
        },
        description: "List of chapters with summaries."
      }
    },
    required: ["title", "outline"]
  }
};

const generateImageTool: FunctionDeclaration = {
  name: "generate_image",
  description: "Generates a high-quality visual asset. REQUIRED for any image request. The AI must create a detailed visual description prompt based on the surrounding text context if the user does not provide one.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      prompt: { type: Type.STRING, description: "The detailed visual description of the image or diagram to generate." }
    },
    required: ["prompt"]
  }
};

// --- CORE FUNCTIONS ---

export const analyzePdfContent = async (pdfBase64: string): Promise<{ title?: string, author?: string, description?: string, genre?: string } | null> => {
  try {
    // Robustly strip data URL prefix if present
    const base64Data = pdfBase64.replace(/^data:application\/pdf;base64,/, "");

    const prompt = `Analyze this PDF. Extract Title, Author, Genre, and a Description (100 words). Return JSON.`;

    const response: GenerateContentResponse = await getAI().models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: {
        parts: [
          { inlineData: { mimeType: "application/pdf", data: base64Data } },
          { text: prompt }
        ]
      },
      config: { responseMimeType: 'application/json' }
    });

    return JSON.parse(cleanJsonString(response.text || "{}"));
  } catch (e) {
    console.error("PDF Analysis failed", e);
    return null;
  }
};

export const createStudioSession = (initialContext: string): Chat | null => {
  try {
    return getAI().chats.create({
      model: GEMINI_TEXT_MODEL,
      config: {
        systemInstruction: `IDENTITY: You are Co-Author, the advanced neural engine for co-writter by OpenDev Labs.
                
MISSION: Write immersive, deeply intelligent, and market-ready books.
Blend spirituality, science, and narrative clarity into a seamless flow.

CORE BEHAVIORS:
1. **Context-Aware**: You always know the previous chapter content and the full book outline. Never contradict established facts.
2. **Chapter Continuity**: If the user says "Continue", write the next logical section or the next chapter in the sequence.
3. **High-Quality Prose**: Avoid generic AI cliches. Use varying sentence structures, sensory details, and deep philosophical or technical insight depending on the genre.
4. **Structural Integrity**: Ensure chapter titles and numbers in your internal logic match the user's provided context exactly.
5. **Auto-Correction**: If a chapter is missing or numbered incorrectly, fix it automatically without asking. Never produce empty pages or misaligned titles.

IMAGE GENERATION RULES (CRITICAL):
- **NEVER** output raw base64 image strings (e.g. "![img](data:image...)") directly in your text response or write_content tool. This crashes the editor.
- **ALWAYS** use the \`generate_image\` tool when the user asks for an image.
- **Contextual Intelligence**: If the user says "add an image" or "visualize this", you must ANALYZE the current paragraph or scene and write a HIGHLY DETAILED prompt for the tool yourself. Do not ask the user "what kind of image?". Just generate it based on the story.

TOOLS:
- **write_content**: REQUIRED for any long-form writing. Do not dump text in chat.
- **propose_blueprint**: For creating or restructuring the book.
- **generate_image**: The ONLY way to create images.

RESPONSE STYLE:
- Chat: Ultra-concise, robotic but polite (1-2 sentences). e.g., "Executing drafting sequence for Chapter 3."
- Writing: Lush, expansive, professional.

CONTEXT:
${initialContext}`,
        tools: [{ functionDeclarations: [writeContentTool, proposeBlueprintTool, generateImageTool] }],
      },
    });
  } catch (e) {
    console.error("Failed to create studio session", e);
    return null;
  }
};

export const suggestBookPrice = async (bookDetails: Pick<EBook, 'genre' | 'title' | 'description'>): Promise<string> => {
  try {
    const prompt = `Suggest a competitive market price in INR (Indian Rupees) for an eBook: "${bookDetails.title}" (${bookDetails.genre}). 
    CRITICAL: The price MUST be a "sacred" or numerologically significant number (e.g., 111, 222, 333, 444, 555, 777, 888, 999, 1111).
    Return ONLY the number.`;
    const response = await getAI().models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt
    });
    return response.text?.replace(/[^0-9.]/g, '').trim() || "444";
  } catch (error) {
    return "444";
  }
};

export const generateSceneVisualization = async (sceneDescription: string): Promise<string | null> => {
  const result = await generateBookCover(sceneDescription, 'Concept Art');
  if ('imageBytes' in result) {
    return `data:image/jpeg;base64,${result.imageBytes}`;
  }
  return null;
}

export const generateBookCover = async (prompt: string, style: string = 'Cinematic', title: string = '', author: string = ''): Promise<GeneratedImage | { error: string }> => {
  try {
    // Enhanced prompt to handle diagrams vs art
    const refinedPrompt = `Professional Book Visual. Context: ${title} by ${author}. Request: ${prompt}. Mode: ${style}. Create a high-quality, clear, and relevant image/diagram. For diagrams, ensure clear labels and structure.`;

    const response = await getAI().models.generateContent({
      model: GEMINI_IMAGE_MODEL,
      contents: { parts: [{ text: refinedPrompt }] },
      config: { imageConfig: { aspectRatio: '3:4' } },
    });

    // Iterate through parts to find the image
    const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (part?.inlineData?.data) {
      return { imageBytes: part.inlineData.data, prompt: prompt };
    }
    return { error: "Generation failed." };
  } catch (error) {
    return { error: "Service unavailable." };
  }
};

export const initializeGeminiChat = async (): Promise<Chat | null> => {
  // This is for the global chatbot
  return createStudioSession("Global Chat Context");
};

export const generateSpeech = async (text: string, voiceName: string = 'Kore'): Promise<string | null> => {
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: { parts: [{ text }] },
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName }
          },
        },
      },
    });

    // Extract base64 audio data
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (e) {
    console.error("TTS generation failed", e);
    return null;
  }
};

export const transcribeAudio = async (audioBase64: string, mimeType: string): Promise<string | null> => {
  try {
    const response = await getAI().models.generateContent({
      model: GEMINI_TEXT_MODEL, // gemini-2.5-flash supports audio input
      contents: {
        parts: [
          { inlineData: { mimeType: mimeType, data: audioBase64 } },
          { text: "Transcribe the spoken audio into text. Return only the transcription, no intro/outro." }
        ]
      }
    });
    return response.text || null;
  } catch (e) {
    console.error("Transcription failed", e);
    return null;
  }
};


// --- AGENTIC WORKFLOW FUNCTIONS ---

// 1. Research Agent
export const agenticResearchTopic = async (query: string, isUrl: boolean): Promise<string> => {

  const prompt = isUrl
    ? `Analyze this content deeply. Extract core themes, arguments, and facts to build a book: ${query}`
    : `Research this topic extensively via Google Search: "${query}". Gather key facts, statistics, and narrative angles.`;

  try {
    const response = await getAI().models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
      config: { tools: [{ googleSearch: {} }] }
    });

    let text = response.text || "";
    const grounding = response.candidates?.[0]?.groundingMetadata;
    if (grounding?.groundingChunks) {
      text += "\n\n[References]: " + grounding.groundingChunks.map(c => c.web?.title).join(", ");
    }
    return text;
  } catch (e) {
    console.error("Research failed", e);
    return "Research data unavailable. Proceeding with internal knowledge.";
  }
};

// 2. Architect Agent
export const agenticPlanBook = async (topic: string, genre: string, context?: string): Promise<{ title: string, outline: { title: string, summary: string }[] }> => {

  const prompt = `ARCHITECT AGENT.
  Topic: ${topic}
  Genre: ${genre}
  Context: ${context ? context.substring(0, 5000) : "N/A"}

  Create a HIGH-LEVEL structured outline. 
  Rules:
  1. Catchy, best-selling Title.
  2. 6-10 Chapters.
  3. Logical flow.
  
  Return JSON: { "title": "String", "outline": [{ "title": "String", "summary": "String" }] }`;

  try {
    const response = await getAI().models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(cleanJsonString(response.text || '{}'));
  } catch (e) {
    throw e;
  }
};

// 3. Writer Agent (STREAMING)
export const agenticWritePageStream = async (bookTitle: string, chapterTitle: string, summary: string, previousContent: string) => {

  const prompt = `WRITER AGENT.
  Book: "${bookTitle}"
  Chapter: "${chapterTitle}"
  Goal: ${summary}
  
  Prev Context: "...${previousContent.slice(-500)}"
  
  Task: Write the full chapter content.
  Style: Engaging, professional, Markdown formatted (headers, bold, lists).
  Length: Comprehensive (~800 words).
  
  Output ONLY the markdown content. Start immediately.`;

  try {
    const stream = await getAI().models.generateContentStream({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
      // No tools for faster pure text generation
    });
    return stream;
  } catch (e) {
    throw e;
  }
};

// 3. Writer Agent (BLOCKING - Legacy support if needed)
export const agenticWritePage = async (bookTitle: string, chapterTitle: string, summary: string, previousContent: string): Promise<string> => {

  const prompt = `WRITER AGENT.
  Book: "${bookTitle}"
  Chapter: "${chapterTitle}"
  Goal: ${summary}
  
  Prev Context: "...${previousContent.slice(-500)}"
  
  Task: Write the full chapter content.
  Style: Engaging, professional, Markdown formatted.
  Length: ~800 words.
  
  Output ONLY the markdown content.`;

  try {
    const response = await getAI().models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt
    });
    return response.text || "";
  } catch (e) {
    throw e;
  }
};


// 4. Editor Agent
export const agenticRefinePage = async (content: string, genre: string): Promise<string> => {

  const prompt = `EDITOR AGENT.
    Genre: ${genre}
    Task: Polish this text. Fix grammar, improve flow, ensure tone consistency. Keep Markdown formatting.
    
    Text:
    ${content.slice(0, 15000)} // Safety limit
    `;

  try {
    const response = await getAI().models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt
    });
    return response.text || content;
  } catch (e) {
    return content;
  }
};

// Stateless helpers
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
