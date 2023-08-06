const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'cwtpnr',
    e2e: {baseUrl:'http://34.171.117.131/'
    ,setupNodeEvents (on,config) {
      // implement node event listeners here
    },
    
  },


});