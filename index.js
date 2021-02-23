const authentication = require('./authentication');
const newListTrigger = require('./triggers/new_list.js');
const newSubscriberTrigger = require('./triggers/new_subscriber.js');
const createSubscriberCreate = require('./creates/create_subscriber.js');
module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  triggers: {
    [newListTrigger.key]: newListTrigger,
    	[newSubscriberTrigger.key]: newSubscriberTrigger,
      },
     creates: {
    [createSubscriberCreate.key]: createSubscriberCreate,

  },
};
