const stocks = new Map([
  ["AAPL", { name: "Apple Inc.", category: "Technology" }],
  ["MSFT", { name: "Microsoft Corporation", category: "Technology" }],
  ["AMZN", { name: "Amazon.com Inc.", category: "Consumer Discretionary" }],
  ["TSLA", { name: "Tesla Inc.", category: "Consumer Discretionary" }],
  ["GOOGL", { name: "Alphabet Inc. Class A", category: "Technology" }],
  ["GOOG", { name: "Alphabet Inc. Class C", category: "Technology" }],
  ["NVDA", { name: "NVIDIA Corporation", category: "Technology" }],
  ["META", { name: "Meta Platforms Inc.", category: "Technology" }],
  ["BRK.B", { name: "Berkshire Hathaway Inc. Class B", category: "Financials" }],
  ["UNH", { name: "UnitedHealth Group Incorporated", category: "Health Care" }],
  ["JNJ", { name: "Johnson & Johnson", category: "Health Care" }],
  ["JPM", { name: "JPMorgan Chase & Co.", category: "Financials" }],
  ["V", { name: "Visa Inc. Class A", category: "Financials" }],
  ["PG", { name: "Procter & Gamble Company", category: "Consumer Staples" }],
  ["MA", { name: "Mastercard Incorporated Class A", category: "Financials" }],
  ["HD", { name: "The Home Depot Inc.", category: "Consumer Discretionary" }],
  ["LLY", { name: "Eli Lilly and Company", category: "Health Care" }],
  ["PFE", { name: "Pfizer Inc.", category: "Health Care" }],
  ["KO", { name: "Coca-Cola Company", category: "Consumer Staples" }],
  ["PEP", { name: "PepsiCo Inc.", category: "Consumer Staples" }],
  ["MRK", { name: "Merck & Co. Inc.", category: "Health Care" }],
  ["CVX", { name: "Chevron Corporation", category: "Energy" }],
  ["ABBV", { name: "AbbVie Inc.", category: "Health Care" }],
  ["XOM", { name: "Exxon Mobil Corporation", category: "Energy" }],
  ["BAC", { name: "Bank of America Corporation", category: "Financials" }],
  ["WMT", { name: "Walmart Inc.", category: "Consumer Staples" }],
  ["INTC", { name: "Intel Corporation", category: "Technology" }],
  ["CSCO", { name: "Cisco Systems Inc.", category: "Technology" }],
  ["ADBE", { name: "Adobe Inc.", category: "Technology" }],
  ["CRM", { name: "Salesforce Inc.", category: "Technology" }],
  ["NFLX", { name: "Netflix Inc.", category: "Communication Services" }],
  ["COST", { name: "Costco Wholesale Corporation", category: "Consumer Staples" }],
  ["AVGO", { name: "Broadcom Inc.", category: "Technology" }],
  ["QCOM", { name: "Qualcomm Inc.", category: "Technology" }],
  ["AXP", { name: "American Express Company", category: "Financials" }],
  ["AMGN", { name: "Amgen Inc.", category: "Health Care" }],
  ["IBM", { name: "International Business Machines Corporation", category: "Technology" }],
  ["BA", { name: "Boeing Company", category: "Industrials" }],
  ["DIS", { name: "Walt Disney Company", category: "Communication Services" }],
  ["SBUX", { name: "Starbucks Corporation", category: "Consumer Discretionary" }],
  ["MCD", { name: "McDonald's Corporation", category: "Consumer Discretionary" }],
  ["F", { name: "Ford Motor Company", category: "Consumer Discretionary" }],
  ["GM", { name: "General Motors Company", category: "Consumer Discretionary" }],
  ["T", { name: "AT&T Inc.", category: "Communication Services" }],
  ["VZ", { name: "Verizon Communications Inc.", category: "Communication Services" }],
  ["AMD", { name: "AMD (Advanced Micro Devices Inc.)", category: "Technology" }],
  ["SNOW", { name: "Snowflake Inc.", category: "Technology" }],
  ["PLTR", { name: "Palantir Technologies Inc.", category: "Technology" }],
  ["DASH", { name: "DoorDash Inc.", category: "Consumer Discretionary" }],
  ["ABNB", { name: "Airbnb Inc.", category: "Consumer Discretionary" }],
  ["UBER", { name: "Uber Technologies Inc.", category: "Consumer Discretionary" }],
  ["LYFT", { name: "Lyft Inc.", category: "Consumer Discretionary" }],
  ["SQ", { name: "Square Inc. (Block Inc.)", category: "Technology" }],
  ["RIVN", { name: "Rivian Automotive Inc.", category: "Consumer Discretionary" }],
  ["LCID", { name: "Lucid Group Inc.", category: "Consumer Discretionary" }],
  ["NIO", { name: "NIO Inc.", category: "Consumer Discretionary" }],
  ["XPEV", { name: "XPeng Inc.", category: "Consumer Discretionary" }],
  ["LI", { name: "Li Auto Inc.", category: "Consumer Discretionary" }],
  ["PLUG", { name: "Plug Power Inc.", category: "Energy" }],
  ["ROKU", { name: "Roku Inc.", category: "Communication Services" }],
  ["DKNG", { name: "DraftKings Inc.", category: "Consumer Discretionary" }],
  ["COIN", { name: "Coinbase Global Inc.", category: "Financials" }],
  ["HOOD", { name: "Robinhood Markets Inc.", category: "Financials" }],
  ["ZM", { name: "Zoom Video Communications Inc.", category: "Technology" }],
  ["PYPL", { name: "PayPal Holdings Inc.", category: "Financials" }],
  ["TXN", { name: "Texas Instruments Incorporated", category: "Technology" }],
  ["PLD", { name: "Prologis Inc.", category: "Real Estate" }],
  ["SCHW", { name: "Charles Schwab Corporation", category: "Financials" }],
  ["BLK", { name: "BlackRock Inc.", category: "Financials" }],
  ["KR", { name: "Kroger Co.", category: "Consumer Staples" }],
  ["NEE", { name: "NextEra Energy Inc.", category: "Utilities" }],
  ["DUK", { name: "Duke Energy Corporation", category: "Utilities" }],
  ["EXC", { name: "Exelon Corporation", category: "Utilities" }],
  ["D", { name: "Dominion Energy Inc.", category: "Utilities" }],
  ["CAT", { name: "Caterpillar Inc.", category: "Industrials" }],
  ["DAL", { name: "Delta Air Lines Inc.", category: "Industrials" }],
  ["LUV", { name: "Southwest Airlines Co.", category: "Industrials" }],
  ["FDX", { name: "FedEx Corporation", category: "Industrials" }],
  ["UPS", { name: "UPS (United Parcel Service Inc.)", category: "Industrials" }],
  ["GE", { name: "General Electric Company", category: "Industrials" }],
  ["MS", { name: "Morgan Stanley", category: "Financials" }],
  ["GS", { name: "Goldman Sachs Group Inc.", category: "Financials" }],
  ["MMM", { name: "3M Company", category: "Industrials" }],
  ["UNP", { name: "Union Pacific Corporation", category: "Industrials" }],
  ["SO", { name: "Southern Company", category: "Utilities" }],
  ["TMO", { name: "Thermo Fisher Scientific Inc.", category: "Health Care" }],
  ["BMY", { name: "Bristol-Myers Squibb Company", category: "Health Care" }],
  ["ETSY", { name: "Etsy Inc.", category: "Consumer Discretionary" }],
  ["PINS", { name: "Pinterest Inc.", category: "Communication Services" }],
  ["SHOP", { name: "Shopify Inc.", category: "Technology" }],
  ["OKTA", { name: "Okta Inc.", category: "Technology" }],
  ["TWLO", { name: "Twilio Inc.", category: "Technology" }],
  ["ZS", { name: "Zscaler Inc.", category: "Technology" }],
  ["DDOG", { name: "Datadog Inc.", category: "Technology" }],
  ["NET", { name: "Cloudflare Inc.", category: "Technology" }],
  ["DOCU", { name: "DocuSign Inc.", category: "Technology" }],
  ["SPLK", { name: "Splunk Inc.", category: "Technology" }],
  ["INTU", { name: "Intuit Inc.", category: "Technology" }],
  ["MDB", { name: "MongoDB Inc.", category: "Technology" }],
  ["SE", { name: "Sea Limited", category: "Communication Services" }],
  ["BABA", { name: "Alibaba Group Holding Ltd.", category: "Consumer Discretionary" }],
  ["JD", { name: "JD.com Inc.", category: "Consumer Discretionary" }],
  ["BIDU", { name: "Baidu Inc.", category: "Communication Services" }],
  ["PDD", { name: "Pinduoduo Inc.", category: "Consumer Discretionary" }],
  ["IQ", { name: "iQIYI Inc.", category: "Communication Services" }],
  ["WB", { name: "Weibo Corporation", category: "Communication Services" }],
  ["NTES", { name: "NetEase Inc.", category: "Communication Services" }],
  ["NTNX", { name: "Nutanix Inc.", category: "Technology" }],
]);

module.exports = stocks;
