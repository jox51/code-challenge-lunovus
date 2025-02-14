export type SaleInsight = {
    name: string,
    email: string,
    product: string,
    category: string,
    amount: number,
    date: string,
    state: string
}

export type SaleInsightList = SaleInsight[]

export type SaleAnalytics = {
    totalSales: number;
    salesPerCategory: Record<string, number>;
    bestPerformingCategory: string;
    salesPerProduct: Record<string, number>;
    bestSellingProduct: string;
    salesPerState: Record<string, number>;
    uniqueCustomers: number;
    averageSalesPerTransaction: number;
    topCustomerBySpending: {
        email: string;
        amount: number;
    };
    salesTrendOverTime: Record<string, number>;
}

export type SaleInsightSummary = {
    analytics: SaleAnalytics,
    summary: string
}