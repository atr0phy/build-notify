const Logger = require('./src/lib/logger');
const postMessage = require('./src/lib/slack-client');

const logger = new Logger();

const buildStatuses = {
  IN_PROGRESS: 'デプロイを開始します',
  SUCCEEDED: 'デプロイに成功しました',
  FAILED: 'デプロイに失敗しました',
  STOPPED: 'デプロイに失敗しました',
};

exports.myHandler = async (event) => {
  const getText = (buildStatus) => {
    let text = buildStatuses[buildStatus] || '一致するステータスがありません';
    if ([buildStatuses.FAILED, buildStatuses.STOPPED].includes(text)) {
      text += `\n ${event.detail['additional-information'].logs['deep-link']}`;
    }
    return text;
  };

  const message = {
    channel: '#develop',
    text: getText(event.detail['build-status']),
    icon_emoji: ':rocket:',
    username: 'build-notify',
  };

  try {
    await postMessage(message);
  } catch (err) {
    logger.log(JSON.stringify(err));
  }
};
