const mailWizz = require("node-mailwizz");
const getLists =async (z, bundle) =>{
// console.log("you are in start");
const config = {
    publicKey: bundle.authData.public_key,
    secret: bundle.authData.private_key,
    baseUrl: "https://mailer.inboxingpro.com/api/index.php"
};
const lists = new mailWizz.Lists(config);
var res=await lists.getLists(1, 1000)
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
   var all_lists= response.data.records.map(function(e){
  e.id = e.general.list_uid,
  e.name = e.general.name,
  e.display_name=e.general.display_name
  return e
}); 
    // console.log(all_lists[0]);
    return all_lists;
  }
  // getLists();
  module.exports = {
  operation: {
    perform: getLists,
    sample: {
      id: 29,
      list_uid: '5eb7bce31aa74',
     
    },
    outputFields: [
      { key: 'id'},
      { key: 'list_uid' }
    ],
    canPaginate: true,
  },
  key: 'new_list',
  noun: 'list',
  display: {
    label: 'New List',
    description: 'Triggers when new list is created.',
    hidden: true,
    important: false,
  },
};