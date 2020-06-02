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
                background_color: '#292D3E',
                theme_color: '#A6ACCD',
                display: 'standalone',
                icon: 'src/assets/logos/icon.svg',
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
            head: true,
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
