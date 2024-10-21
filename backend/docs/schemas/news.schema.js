const newsSchema = {
  type: "object",
  properties: {
    generals: {
      type: "array",
      description: "The general news list.",
      example: [{
        news_url: "string",
        image_url: "string",
        title: "string",
        text: "string",
        source_name: "string",
        date: "string",
        topics: "array",
        sentiment: "string",
        type: "string"
      }]
    },
    coins: {
      type: "array",
      description: "The coin news list.",
      example: [{
        news_url: "string",
        image_url: "string",
        title: "string",
        text: "string",
        source_name: "string",
        date: "string",
        topics: "array",
        sentiment: "string",
        type: "string",
        tickers: "array"
      }]
    }
  }
}

module.exports = {
  newsSchema
}