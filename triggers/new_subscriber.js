const mailWizz = require("node-mailwizz");
const getListSubscriber =async (z, bundle) =>{
// console.log("you are in start");
var list_uid = bundle.inputData.list_uid;
const config = {
    publicKey: bundle.authData.public_key,
    secret: bundle.authData.private_key,
    baseUrl: "https://mailer.inboxingpro.com/api/index.php"
};
// const lists = new mailWizz.Lists(config);
const subscribers = new mailWizz.ListSubscribers(config);
var res=await subscribers.getSubscribers(list_uid, 1, 1000)
    .then(function(result) {
        //TODO: do what you want
          return result;
//         return  result.records.
         // console.log(result);
         // console.log("you are in function"+JSON.stringify(result));
    })
    .catch(function(err) {
        //handle error here
    });
    var response=JSON.parse(res)
   var all_subscribers= response.data.records.map(function(e){
  e.id = e.subscriber_uid
  return e
}); 
    // console.log(all_lists[0]);
    return all_subscribers;
  }
  // getLists();
  module.exports = {
  operation: {
    perform: getListSubscriber,
      inputFields: [
      {
        key: 'list_uid',
        label: 'List Name',
        type: 'string',
        dynamic: 'new_list.id.name',
        required: true,
        list: false,

        altersDynamicFields: false,
      }
    ],
    sample: {
      id: 29,
      subscriber_uid: '5eb7bce31aa74',
      },
    outputFields: [
      { key: 'id'}
    ],
    canPaginate: true,
  },
  key: 'new_subscriber',
  noun: 'subscriber',
  display: {
    label: 'New Subscriber',
    description: 'Triggers when new Subscriber is created in specific list.',
    hidden: false,
    important: true,
  },
};