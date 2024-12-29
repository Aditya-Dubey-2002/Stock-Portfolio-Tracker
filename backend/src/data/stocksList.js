const stocks = [
  { name: "Apple Inc.", symbol: "AAPL" },
  { name: "Microsoft Corporation", symbol: "MSFT" },
  { name: "Amazon.com Inc.", symbol: "AMZN" },
  { name: "Tesla Inc.", symbol: "TSLA" },
  { name: "Alphabet Inc. Class A", symbol: "GOOGL" },
  { name: "Alphabet Inc. Class C", symbol: "GOOG" },
  { name: "NVIDIA Corporation", symbol: "NVDA" },
  { name: "Meta Platforms Inc.", symbol: "META" },
  { name: "Berkshire Hathaway Inc. Class B", symbol: "BRK.B" },
  { name: "UnitedHealth Group Incorporated", symbol: "UNH" },
  { name: "Johnson & Johnson", symbol: "JNJ" },
  { name: "JPMorgan Chase & Co.", symbol: "JPM" },
  { name: "Visa Inc. Class A", symbol: "V" },
  { name: "Procter & Gamble Company", symbol: "PG" },
  { name: "Mastercard Incorporated Class A", symbol: "MA" },
  { name: "The Home Depot Inc.", symbol: "HD" },
  { name: "Eli Lilly and Company", symbol: "LLY" },
  { name: "Pfizer Inc.", symbol: "PFE" },
  { name: "Coca-Cola Company", symbol: "KO" },
  { name: "PepsiCo Inc.", symbol: "PEP" },
  { name: "Merck & Co. Inc.", symbol: "MRK" },
  { name: "Chevron Corporation", symbol: "CVX" },
  { name: "AbbVie Inc.", symbol: "ABBV" },
  { name: "Exxon Mobil Corporation", symbol: "XOM" },
  { name: "Bank of America Corporation", symbol: "BAC" },
  { name: "Walmart Inc.", symbol: "WMT" },
  { name: "Intel Corporation", symbol: "INTC" },
  { name: "Cisco Systems Inc.", symbol: "CSCO" },
  { name: "Adobe Inc.", symbol: "ADBE" },
  { name: "Salesforce Inc.", symbol: "CRM" },
  { name: "Netflix Inc.", symbol: "NFLX" },
  { name: "Costco Wholesale Corporation", symbol: "COST" },
  { name: "Broadcom Inc.", symbol: "AVGO" },
  { name: "Qualcomm Inc.", symbol: "QCOM" },
  { name: "American Express Company", symbol: "AXP" },
  { name: "Amgen Inc.", symbol: "AMGN" },
  { name: "International Business Machines Corporation", symbol: "IBM" },
  { name: "Boeing Company", symbol: "BA" },
  { name: "Walt Disney Company", symbol: "DIS" },
  { name: "Starbucks Corporation", symbol: "SBUX" },
  { name: "McDonald's Corporation", symbol: "MCD" },
  { name: "Ford Motor Company", symbol: "F" },
  { name: "General Motors Company", symbol: "GM" },
  { name: "AT&T Inc.", symbol: "T" },
  { name: "Verizon Communications Inc.", symbol: "VZ" },
  { name: "AMD (Advanced Micro Devices Inc.)", symbol: "AMD" },
  { name: "Snowflake Inc.", symbol: "SNOW" },
  { name: "Palantir Technologies Inc.", symbol: "PLTR" },
  { name: "DoorDash Inc.", symbol: "DASH" },
  { name: "Airbnb Inc.", symbol: "ABNB" },
  { name: "Uber Technologies Inc.", symbol: "UBER" },
  { name: "Lyft Inc.", symbol: "LYFT" },
  { name: "Square Inc. (Block Inc.)", symbol: "SQ" },
  { name: "Rivian Automotive Inc.", symbol: "RIVN" },
  { name: "Lucid Group Inc.", symbol: "LCID" },
  { name: "NIO Inc.", symbol: "NIO" },
  { name: "XPeng Inc.", symbol: "XPEV" },
  { name: "Li Auto Inc.", symbol: "LI" },
  { name: "Plug Power Inc.", symbol: "PLUG" },
  { name: "Roku Inc.", symbol: "ROKU" },
  { name: "DraftKings Inc.", symbol: "DKNG" },
  { name: "Coinbase Global Inc.", symbol: "COIN" },
  { name: "Robinhood Markets Inc.", symbol: "HOOD" },
  { name: "Zoom Video Communications Inc.", symbol: "ZM" },
  { name: "PayPal Holdings Inc.", symbol: "PYPL" },
  { name: "Texas Instruments Incorporated", symbol: "TXN" },
  { name: "Prologis Inc.", symbol: "PLD" },
  { name: "Charles Schwab Corporation", symbol: "SCHW" },
  { name: "BlackRock Inc.", symbol: "BLK" },
  { name: "Kroger Co.", symbol: "KR" },
  { name: "NextEra Energy Inc.", symbol: "NEE" },
  { name: "Duke Energy Corporation", symbol: "DUK" },
  { name: "Exelon Corporation", symbol: "EXC" },
  { name: "Dominion Energy Inc.", symbol: "D" },
  { name: "Caterpillar Inc.", symbol: "CAT" },
  { name: "Delta Air Lines Inc.", symbol: "DAL" },
  { name: "Southwest Airlines Co.", symbol: "LUV" },
  { name: "FedEx Corporation", symbol: "FDX" },
  { name: "UPS (United Parcel Service Inc.)", symbol: "UPS" },
  { name: "General Electric Company", symbol: "GE" },
  { name: "Morgan Stanley", symbol: "MS" },
  { name: "Goldman Sachs Group Inc.", symbol: "GS" },
  { name: "3M Company", symbol: "MMM" },
  { name: "Union Pacific Corporation", symbol: "UNP" },
  { name: "Southern Company", symbol: "SO" },
  { name: "Thermo Fisher Scientific Inc.", symbol: "TMO" },
  { name: "Pfizer Inc.", symbol: "PFE" },
  { name: "Bristol-Myers Squibb Company", symbol: "BMY" },
  { name: "Etsy Inc.", symbol: "ETSY" },
  { name: "Pinterest Inc.", symbol: "PINS" },
  { name: "Shopify Inc.", symbol: "SHOP" },
  { name: "Okta Inc.", symbol: "OKTA" },
  { name: "Twilio Inc.", symbol: "TWLO" },
  { name: "Zscaler Inc.", symbol: "ZS" },
  { name: "Datadog Inc.", symbol: "DDOG" },
  { name: "Cloudflare Inc.", symbol: "NET" },
  { name: "DocuSign Inc.", symbol: "DOCU" },
  { name: "Splunk Inc.", symbol: "SPLK" },
  { name: "Intuit Inc.", symbol: "INTU" },
  { name: "MongoDB Inc.", symbol: "MDB" },
  { name: "Sea Limited", symbol: "SE" },
  { name: "Alibaba Group Holding Ltd.", symbol: "BABA" },
  { name: "JD.com Inc.", symbol: "JD" },
  { name: "Baidu Inc.", symbol: "BIDU" },
  { name: "Pinduoduo Inc.", symbol: "PDD" },
  { name: "iQIYI Inc.", symbol: "IQ" },
  { name: "Weibo Corporation", symbol: "WB" },
  { name: "NetEase Inc.", symbol: "NTES" },
  { name: "Nutanix Inc.", symbol: "NTNX" },
];

module.exports = stocks;
