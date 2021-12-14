/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/

module.exports = {
  // "AtlasDB": "mongodb://localhost/incident_list",
  // "AtlasDB":"mongodb+srv://admin:mx9nxX3to2M1lFDO@runtime.efacg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  // "Secret": 'SomeSecret'
  "AtlasDB": process.env.ATLASDB,
  "SecretOrKey": process.env.SECRETKEY
}