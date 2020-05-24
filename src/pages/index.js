import React from 'react';

import Layout from '../components/Layout/Layout';
import SEO from '../components/Seo/SEO';
import Page from '../components/Page/Page';
import TeaSession from '../components/TeaSession';


const DANCONG_HUANG_PIAN = {
  infusions: [15, 15, 30, 30, 30, 45, 60],
  name: 'Dancong Huang Pian',
  waterTemp: 90,
  defaultTimeIncrement: 15,
  amount: '3',
};
const IndexPage = () => (
    <Layout>
        <SEO title={'Home'}/>
        <Page>
          <TeaSession
            {...DANCONG_HUANG_PIAN}
          />
        </Page>
    </Layout>
);

export default IndexPage;
