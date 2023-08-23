export const handler = async (event) => {
    console.log("request:", JSON.stringify(event, undefined, 2))
    // TODO implement
    const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
  };
  