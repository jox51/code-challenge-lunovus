import ErrorMessages from "@/app/constants/errors";
import generativeAI from "@/app/services/gpt-api.service";
import loggerService from "@/app/services/logger.service";
import saleInsightService from "@/app/services/sale-insight.service";
import { ApiResult } from "@/app/types/network-res";
import { SaleInsightList, SaleInsightSummary } from "@/app/types/sale-insight";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const payload: SaleInsightList = await req.json();

        if (!payload?.length) {
            return NextResponse.json(
                {
                    success: false,
                    errorMessage: ErrorMessages.INVALID_REQUEST_PAYLOAD,
                } as ApiResult<null>,
                { status: 500 }
            );
        }

        //@todo:: Validate each JSON object of the sales array.

        const analytics = saleInsightService.getAnalytics(payload);
        const prompt = saleInsightService.getSalesAnalyticsPrompt(analytics);
        const summary = await generativeAI.getHumanReadableSummary(prompt);

        return NextResponse.json(
            {
                success: true,
                data: {
                    analytics,
                    summary,
                },
            } as ApiResult<SaleInsightSummary>,
            { status: 200 }
        );
    } catch (err: unknown) {
        loggerService.error(
            (err as Error)?.message || ErrorMessages.GENERIC_API_ERROR
        );
        return NextResponse.json(
            {
                success: false,
                errorMessage: ErrorMessages.GENERIC_API_ERROR,
                rawErrorMessage: (err as Error)?.message,
            } as ApiResult<null>,
            { status: 500 }
        );
    }
}
