import React from 'react';

import Layout from '../components/Layout/Layout';
import SEO from '../components/Seo/SEO';
import Page from '../components/Page/Page';
import TeaSession from '../components/TeaSession';
import SUGGESTED_TIMES from '../constants/mei-leaf-suggested-times';
import NANNUOSHAN_TIMES from '../constants/nannuoshan';
import Switch from '../components/Switch';

import styles from './index.module.css';


class IndexPage extends React.Component {
  state = {
    western: false,
    selectedTea: this.teas[0]
  };

  get teas() {
    return [
      ...SUGGESTED_TIMES,
      ...NANNUOSHAN_TIMES,
    ];
  }

  handleTeaSelect = e => {
    this.setState({
      selectedTea: this.teas.find(x => x.name === e.target.value)
    })
  }

  handleBrewMethodSelect = e => {
    this.setState({
      western: e.target.checked
    }, () => {
      this.setState({
        selectedTea: this.teas.find(x => x.name === this.state.selectedTea.name)
      })
    })
  }

  render() {
    return (
      <Layout>
          <SEO title={"Can's Tea Companion"}/>
          <Page>
            <div className={styles.selectorsContainer}>
              <div>
                <label htmlFor='teas'>Tea Types: &nbsp;</label>
                <select name='teas' onChange={this.handleTeaSelect} className={styles.teaSelector}>
                  {
                    this.teas.map(tea => (
                      <option key={tea.name} value={tea.name}>{tea.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className={styles.switchContainer}>
                Gong Fu &nbsp;<Switch onChange={this.handleBrewMethodSelect} value={this.state.western} /> &nbsp;  Western
              </div>
            </div>

            <TeaSession
              westernMethod={this.state.western}
              {...this.state.selectedTea}
            />

            <div className={styles.credits}>
              <p>
                Original content can be found <a className={styles.link} rel="noreferrer" href="https://meileaf.com/resources/pdf/mei-leaf-tea-brewing-guide.pdf" target="_blank">here</a>
              </p>
              <p>
                Made with {'<3'} and tea by <a className={styles.link} rel="noreferrer" href="https://can.ibanog.lu" target="_blank">me</a>. 
              </p>
              <p>
                Bug reports, feature requests should all go <a className={styles.link} rel="noreferrer" href="https://www.github.com/canibanoglu/teacompanion" target="_blank">here</a>
              </p>
            </div>

          </Page>
      </Layout>
    );
  }
}

export default IndexPage;
