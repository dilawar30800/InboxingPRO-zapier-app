const mailWizz = require("node-mailwizz");


const testAuth = (z, bundle) => {
const config = {
    publicKey: bundle.authData.public_key,
    secret: bundle.authData.private_key,
    baseUrl: "https://mailer.inboxingpro.com/api/index.php"
};

const lists = new mailWizz.Lists(config);
lists.getLists(1, 10)
    .then(function(result) {
        //TODO: do what you want
        return result;
    })
    .catch(function(err) {
        //handle error here
    });
    return lists;
};


module.exports = {
  type: 'custom',
  test:testAuth,
  fields: [
    { computed: false, key: 'public_key', required: true, label: 'Public key' },
    {
      computed: false,
      key: 'private_key',
      required: true,
      label: 'Private Key',
      type: 'password',
    },
  ],
  customConfig: {},
};
