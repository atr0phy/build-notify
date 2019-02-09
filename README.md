## description
Slack notification of CodeBuild by Cloudwatch Events

# how to install
1. `pip3 install --user aws-sam-cli`
1. `docker-compose up -d`
1. `aws --endpoint-url http://localhost:4583 ssm put-parameter --name /development/slack_api_token --value YOUR_API_TOKEN --type String`
1. ``sam local invoke BuildNotifyFunction --event ./test/events/in_progress.json --docker-network `docker network ls | grep build-notify_default | awk '{print $1}'` ``