import { APIGatewayEvent, Context } from 'aws-lambda';

const sayHello = (message: string): string => {
  return `Hello ${message}!`;
};

exports.hello = async (
  event: APIGatewayEvent,
  context: Context,
): Promise<string> => {
  context.callbackWaitsForEmptyEventLoop = false;
  const queryStrings = event.queryStringParameters || {};
  let eventParam = '';

  try {
    eventParam = queryStrings.message || '';
  } catch (error) {
    console.error(error);
  }
  return sayHello(eventParam);
};

export { sayHello };
