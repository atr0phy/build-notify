const Logger = require('./src/lib/logger');
const SlackClient = require('./src/lib/slack-client');
const getParameter = require('./src/lib/ssm-client');

const SLACK_CHANNEL = process.env.SLACK_CHANNEL || '';
const SLACK_TOKEN_KEY = '/development/slack_api_token';
const BuildStatus = {
  IN_PROGRESS: 'デプロイを開始します',
  SUCCEEDED: 'デプロイに成功しました',
  FAILED: 'デプロイに失敗しました',
  STOPPED: 'デプロイに失敗しました',
};

const logger = new Logger();

exports.handle = async (event) => {
  const getText = (status) => {
    let text = BuildStatus[status] || '一致するステータスがありません';
    if ([BuildStatus.FAILED, BuildStatus.STOPPED].includes(text)) {
      text += `\n ${event.detail['additional-information'].logs['deep-link']}`;
    }
    return text;
  };

  const message = {
    channel: SLACK_CHANNEL,
    text: getText(event.detail['build-status']),
    icon_emoji: ':rocket:',
    username: 'build-notify',
  };

  try {
    const token = await getParameter(SLACK_TOKEN_KEY);
    const slackClient = new SlackClient(token);
    await slackClient.postMessage(message);
  } catch (err) {
    logger.error(err);
  }
};
