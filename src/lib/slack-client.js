const { WebClient } = require('@slack/client');

const token = process.env.SLACK_TOKEN || '';
const web = new WebClient(token);

const postMessage = (message) => {
  if (!message) Promise.reject();
  return web.chat.postMessage(message);
};

module.exports = postMessage;
