import { SaleAnalytics, SaleInsightList } from "../types/sale-insight";

class SaleInsightService {

    constructor() { }

    //#region analytics calculators
    private totalSales(data: SaleInsightList) { return data.reduce((sum, sale) => sum + sale.amount, 0) }

    private salesPerCategory(data: SaleInsightList) {
        return data.reduce((acc, sale) => {
            acc[sale.category] = (acc[sale.category] || 0) + sale.amount;
            return acc;
        }, Object.create(null));
    };

    private bestCategory(data: SaleInsightList) {
        const sales = this.salesPerCategory(data);
        return Object.keys(sales).reduce((best, category) =>
            sales[category] > sales[best] ? category : best
        );
    };

    private salesPerProduct(data: SaleInsightList) {
        return data.reduce((acc, sale) => {
            acc[sale.product] = (acc[sale.product] || 0) + sale.amount;
            return acc;
        }, Object.create(null));
    };

    private bestSellingProduct(data: SaleInsightList) {
        const sales = this.salesPerProduct(data);
        return Object.keys(sales).reduce((best, product) =>
            sales[product] > sales[best] ? product : best
        );
    };


    private salesPerState(data: SaleInsightList) {
        return data.reduce((acc, sale) => {
            acc[sale.state] = (acc[sale.state] || 0) + sale.amount;
            return acc;
        }, Object.create(null));
    };

    private uniqueCustomers(data: SaleInsightList) {
        const customers = new Set(data.map(sale => sale.email));
        return customers.size;
    };

    private averageSalesPerTransaction(data: SaleInsightList) {
        return this.totalSales(data) / data.length;
    };

    private topCustomer(data: SaleInsightList) {
        const customerSpending = data.reduce((acc, sale) => {
            acc[sale.email] = (acc[sale.email] || 0) + sale.amount;
            return acc;
        }, Object.create(null));
        const topEmail = Object.keys(customerSpending).reduce((top, customer) =>
            customerSpending[customer] > customerSpending[top] ? customer : top
        );
        return { email: topEmail, amount: customerSpending[topEmail] }
    };


    private salesTrend(data: SaleInsightList) {
        return data.reduce((acc, sale) => {
            acc[sale.date] = (acc[sale.date] || 0) + sale.amount;
            return acc;
        }, Object.create(null));
    };
    //#endregion


    getAnalytics(payload: SaleInsightList): SaleAnalytics {
        return ({
            totalSales: this.totalSales(payload),
            salesPerCategory: this.salesPerCategory(payload),
            bestPerformingCategory: this.bestCategory(payload),
            salesPerProduct: this.salesPerProduct(payload),
            bestSellingProduct: this.bestSellingProduct(payload),
            salesPerState: this.salesPerState(payload),
            uniqueCustomers: this.uniqueCustomers(payload),
            averageSalesPerTransaction: this.averageSalesPerTransaction(payload),
            topCustomerBySpending: this.topCustomer(payload),
            salesTrendOverTime: this.salesTrend(payload),
        })
    }

    getSalesAnalyticsPrompt(analytics: SaleAnalytics) {
        const jsonStr = JSON.stringify(analytics, null, 2);
        const prompt = `Based on the following sales analytics data, generate a concise and insightful summary highlighting key trends, best-performing categories, top customers, and any notable insights. Keep it engaging and easy to understand for business stakeholders. Analytics Data: ${jsonStr || ''}`
        return prompt;
    }
}

const saleInsightService = new SaleInsightService();

export default saleInsightService;