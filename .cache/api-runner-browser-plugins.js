module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Gatsby Starter Redux + Storybook","short_name":"Gatsby Starter Redux + Storybook","start_url":"/","background_color":"#ffffff","theme_color":"#744C9E","display":"standalone","icon":"src/assets/logos/icon.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"edf3d310d67f8284a562bc3a58c3e761"},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
