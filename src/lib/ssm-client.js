const AWS = require('aws-sdk');

const endpoint = process.env.NODE_ENV === 'local' ? new AWS.Endpoint('http://localstack:4583') : undefined;
const ssm = new AWS.SSM({ endpoint });

const getParameter = async (key, decrypt) => {
  const params = {
    Name: key,
    WithDecryption: decrypt,
  };
  try {
    return (await ssm.getParameter(params).promise()).Parameter.Value;
  } catch (err) {
    throw err;
  }
};

module.exports = getParameter;
