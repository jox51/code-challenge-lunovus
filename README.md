# Next.js API TypeScript Code Challenge

## Requirements

- **Node.js Version**: `>= 18.x`
- **Package Manager**: `npm` (Recommended)
- **Docker**: Required for containerization

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# API Keys
GEMINI_API_KEY=<your_api_key>
DEBUG=true
```

## Run & Build Guide

### Install Dependencies

```sh
npm install
```

### Run the Development Server

```sh
npm dev
```

Access the application at `http://localhost:3000`

### Build for Production

```sh
npm build
```

### Start Production Server

```sh
npm start
```

## Docker Setup

To run the project in a Docker container, follow these steps:

1. Build the Docker image:

   ```sh
   docker build -t code-challenge-lunovus .
   ```

2. Run the container:

   ```sh
   docker run -p 3000:3000 --env-file .env code-challenge-lunovus
   ```

3. Access the application at `http://localhost:3000`

## Testing the Sales POST API

### Endpoint:

```
POST api/sales/insights
```

### Request Payload (JSON):

```json
[
  {
    "name": "Alice Johnson",
    "email": "alice.johnson1@example.com",
    "product": "Widget A",
    "category": "Widgets",
    "amount": 120.5,
    "date": "2023-03-01",
    "state": "California"
  }
]
```

### Expected Response (JSON):

```json
{
  "success": true,
  "data": {
    "analytics": {
      "totalSales": 315.5,
      "salesPerCategory": { "Widgets": 315.5 },
      "bestPerformingCategory": "Widgets",
      "salesPerProduct": { "Widget A": 315.5 },
      "bestSellingProduct": "Widget A",
      "salesPerState": { "California": 315.5 },
      "uniqueCustomers": 3,
      "averageSalesPerTransaction": 105.16666666666667,
      "topCustomerBySpending": {
        "email": "alice.johnson1@example.com",
        "amount": 120.5
      },
      "salesTrendOverTime": {
        "2023-03-01": 120.5,
        "2023-03-02": 85,
        "2023-03-03": 110
      }
    },
    "summary": "**Sales Summary:**\n\nIn the observed period, our business generated a total revenue of $315.5, driven entirely by the sales of **Widgets**. This category emerged as the **best performer**, showcasing exceptional demand.\n\n**Product Performance:**\n\n**Widget A** was the **top-selling product**, accounting for 100% of the revenue. Its impressive sales ensure a consistent revenue stream for the company.\n\n**Customer Insights:**\n\nWith a total of 3 unique customers, we observed an **average sales per transaction of $105.17**. **Alice Johnson** emerged as our **top customer**, spending $120.5. Nurturing relationships with such valuable customers is crucial for sustained growth.\n\n**Sales Trends:**\n\nOur sales exhibited a promising trend over time:\n\n* March 1st: $120.5\n* March 2nd: $85\n* March 3rd: $110\n\nThis gradual increase signals a positive momentum and indicates potential for future growth.\n\n**Notable Insights:**\n\n* **Product Concentration:** The reliance on a single product category (Widgets) warrants consideration of product diversification to mitigate potential risks.\n* **Customer Base Expansion:** Acquiring new customers is essential for business growth. Implementing effective marketing strategies can help broaden our customer reach.\n* **Sales Momentum:** The steady increase in sales is a positive sign but requires sustained efforts to maintain and accelerate."
  }
}
```

### Testing with cURL:

```sh
curl --location 'http://localhost:3000/api/sales/insights' \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "name": "Alice Johnson",
        "email": "alice.johnson1@example.com",
        "product": "Widget A",
        "category": "Widgets",
        "amount": 120.50,
        "date": "2023-03-01",
        "state": "California"
    },
    {
        "name": "Bob Smith",
        "email": "bob.smith2@example.com",
        "product": "Widget A",
        "category": "Widgets",
        "amount": 85.00,
        "date": "2023-03-02",
        "state": "California"
    },
    {
        "name": "Charlie Davis",
        "email": "charlie.davis3@example.com",
        "product": "Widget A",
        "category": "Widgets",
        "amount": 110.00,
        "date": "2023-03-03",
        "state": "California"
    }
]'
```

### Testing with Postman:

1. Open Postman and select `POST` request.
2. Enter `http://localhost:3000/api/sales/insights` as the URL.
3. In the **Body** tab, select `raw` and choose `JSON`.
4. Paste the request payload.
5. Click **Send** to test the API.

