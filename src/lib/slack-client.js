const { WebClient } = require('@slack/client');

class SlackClient {
  constructor(token) {
    this.client = new WebClient(token);
  }

  postMessage(message) {
    if (!message) Promise.reject();
    return this.client.chat.postMessage(message);
  }
}

module.exports = SlackClient;
