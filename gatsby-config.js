module.exports = {
    siteMetadata: {
        title: 'Can\'s Tea Companion',
        description: 'A small app to keep track of infusions and time them',
        author: 'Can Ibanoglu',
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Can\'s Tea Companion',
                short_name: 'Can\'s Tea Companion',
                start_url: '/',
                background_color: '#ffffff',
                theme_color: '#744C9E',
                display: 'standalone',
                icon: 'src/assets/logos/icon.png',
            },
        }, {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/`,
                name: 'src',
            },
        },
        {
          resolve: `gatsby-plugin-google-analytics`,
          options: {
            trackingId: process.env['GOOGLE_ANALYTICS_TRACKING_ID']
          },
        },
        'gatsby-plugin-root-import',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-offline',
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        'gatsby-plugin-styled-components',
        'gatsby-plugin-sass'
    ],
};
