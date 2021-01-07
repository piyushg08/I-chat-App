const moment = require('moment');

function formatMessage(username, text,label) {
  return {
    username,
    text,
    label,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;
