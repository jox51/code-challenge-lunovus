import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import loggerService from "./logger.service";
import ErrorMessages from "../constants/errors";

class GenerativeAIService {
    private _gpt: GoogleGenerativeAI;
    private _model: GenerativeModel;
    private readonly NO_RESPONSE = ErrorMessages.GENERIC_API_ERROR

    constructor(private apiKey: string) {
        this._gpt = new GoogleGenerativeAI(apiKey)
        this._model = this._gpt.getGenerativeModel({ model: 'gemini-pro' });
    }

    async getHumanReadableSummary(prompt: string) {
        try {
            const rawRes = await this._model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });
            const summary = rawRes.response?.candidates?.at?.(0)?.content?.parts?.at?.(0)?.text || this.NO_RESPONSE;
            return summary
        } catch (err: unknown) {
            loggerService.info((err as Error)?.message || this.NO_RESPONSE)
            return this.NO_RESPONSE
        }
    }
}



const generativeAI = new GenerativeAIService(process.env.GEMINI_API_KEY);

export default generativeAI;