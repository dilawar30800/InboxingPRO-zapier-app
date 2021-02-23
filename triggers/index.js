const mailWizz = require("../node_modules/node-mailwizz");
const getFields =async (z,bundle) =>{
// console.log("you are in start");
//var list_uid=bundle.inputData.list_uid;
const config = {
    publicKey: "bc00a9b76bc5c5efe2251b5017ea6f9b8a1152fc",
    secret: "a444b9126e06aef6cee3d46ac9b7d3a26f3f76d9",
    baseUrl: "https://mailer.inboxingpro.com/api/index.php"
};
const lists = new mailWizz.Lists(config);
var res=await lists.getListFields('zy5655sg1j38b')
// var res=await lists.getListFields(list_uid)
    .then(function(result) {
        //TODO: do what you want
          return result;
  })
    .catch(function(err) {
        //handle error here
        return err;
    });
    var response=JSON.parse(res);
   var fields= response.data.records.map(function(e){
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

      return e
      }); 
   var arr=[];
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
               
            }
        ];
  for(var i=0;i<response.data.records.length;i++)
  {
   var obj=response.data.records[i];
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
    console.log("This is result: "+arr);
    for(var i=0;i<arr.length;i++)
    {
      console.log(arr[i]);
    }
    // return fields;
  }
  getFields();
  