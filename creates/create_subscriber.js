const mailWizz = require("node-mailwizz");

const getFields =async (z,bundle) =>{
var field= [
            {
                "key": "EMAIL",
                "name": "Email"
                
            },
            {
                "key": "FIRST_NAME",
                "name": "First name"
              
            },
            {
                "key": "LAST_NAME",
                "name": "Last name"
                
            },
            {
                "key": "consent",
                "name": "Consent",
               
            }];
var list_uid = bundle.inputData.list_uid;
const config = {
    publicKey: bundle.authData.public_key,
    secret: bundle.authData.private_key,
    baseUrl: "https://mailer.inboxingpro.com/api/index.php"
};
 var list_fields=[];
 var arr=[];
const lists = new mailWizz.Lists(config);
var res=await lists.getListFields(list_uid)
.then(function(result) {
    var response=JSON.parse(result);
    return response;
  })
.catch(function(err){});
     var fields= res.data.records.map(function(e){
      if(e.required=="no")
      {
        e.required=false;
      }else
      {
        e.required=true;
      }
      e.key=e.tag;
      e.name=e.label
      delete e.tag;
      delete e.help_text;
      delete e.type;
      // list_fields.push(e);
      return e
      }); 
 for(var i=0;i<res.data.records.length;i++)
  {
   var obj=res.data.records[i];
   var is_required=false;
    if(obj.required=="no")
      {
        is_required=false;
      }else
      {
        is_required=true;
      }
      arr.push({"key":obj.key, "name":obj.label, "required":is_required});
     
  }
  z.console.log("Fields Data"+JSON.stringify(arr));
  return arr;

  }

const perform = (z, bundle) => {
  var list_uid = bundle.inputData.list_uid;
   if (bundle.inputData.hasOwnProperty('list_uid')) {
    // true
    delete bundle.inputData['list_uid'];
  }
const config = {
    publicKey: bundle.authData.public_key,
    secret: bundle.authData.private_key,
    baseUrl: "https://mailer.inboxingpro.com/api/index.php"
};

const subscribers = new mailWizz.ListSubscribers(config);
return subscribers.create(list_uid, bundle.inputData)
    .then(function(result) {
        var res=JSON.parse(result);
        return res.data.record;      
    })
    .catch(function(err) {
        throw new z.errors.Error('Subscriber with this email already exist.', 'Duplication', 200);
    });


};
module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'list_uid',
        label: 'List Name',
        type: 'string',
        dynamic: 'new_list.id.name',
        required: true,
        list: false,

        altersDynamicFields: true,
      },
      getFields,
    ],
    sample: {
      subscriber_uid: 'ld733bpcgba8c',
      id: 'ld733bpcgba8c',
    },
    outputFields: [
      { key: 'id' },
      { key: 'subscriber_uid' },
    ],
  },
  key: 'create_subscriber',
  noun: 'subscriber',
  display: {
    label: 'Create New Subscriber',
    description: 'this action will create new action in hubiomail',
    hidden: false,
    important: true,
  },
};
