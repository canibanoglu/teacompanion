import React from 'react';

import Layout from '../components/Layout/Layout';
import SEO from '../components/Seo/SEO';
import Page from '../components/Page/Page';
import TeaSession from '../components/TeaSession';
import SUGGESTED_TIMES from '../constants/mei-leaf-suggested-infusion-times';
import Switch from '../components/Switch';

import styles from './index.module.css';


const DANCONG_HUANG_PIAN = {
  infusions: [15, 15, 30, 30, 30, 45, 60],
  name: 'Dancong Huang Pian',
  waterTemp: 90,
  defaultTimeIncrement: 15,
  amount: '3',
};

class IndexPage extends React.Component {
  state = {
    western: false,
    selectedTea: SUGGESTED_TIMES.GONG_FU[0],
  };

  get teas() {
    return this.state.western ? SUGGESTED_TIMES.WESTERN : SUGGESTED_TIMES.GONG_FU;
  }

  handleTeaSelect = e => {
    this.setState({
      selectedTea: this.teas.find(x => x.name === e.target.value)
    })
  }
  render() {
    return (
      <Layout>
          <SEO title={'Home'}/>
          <Page>
            <div className={styles.selectorsContainer}>
              <div>
                <label for='teas'>Tea Types:</label>
                <select name='teas' onChange={this.handleTeaSelect}>
                  {
                    this.teas.map(tea => (
                      <option value={tea.name}>{tea.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className={styles.switchContainer}>
                Gong Fu &nbsp;<Switch /> &nbsp;  Western
              </div>
            </div>

            <TeaSession
              {...this.state.selectedTea}
            />

            <div className={styles.credits}>
              <p>
                Original content can be found <a className={styles.link} href="https://meileaf.com/resources/pdf/mei-leaf-tea-brewing-guide.pdf" target="_blank">here</a>
              </p>
              <p>
                Made with {'<3'} and tea by <a className={styles.link} href="https://can.ibanog.lu" target="_blank">me</a>. 
              </p>
              <p>
                Bug reports, feature requests should all go <a className={styles.link} href="https://www.github.com/canibanoglu/teacompanion" target="_blank">here</a>
              </p>
            </div>

          </Page>
      </Layout>
    );
  }
}

export default IndexPage;
