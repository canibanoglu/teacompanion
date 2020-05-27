import React from 'react';

import Layout from '../components/Layout/Layout';
import SEO from '../components/Seo/SEO';
import Page from '../components/Page/Page';
import TeaSession from '../components/TeaSession';
import SUGGESTED_TIMES from '../constants/mei-leaf-suggested-times';
import NANNUOSHAN_TIMES from '../constants/nannuoshan';
import Switch from '../components/Switch';
import {
  saveTeaSessions,
  getTeaSessions,
  saveUserPreferences,
  getUserPreferences
} from '../utils/persistence';
import CustomTeaSessionModal from '../components/CustomTeaSessionModal';


import styles from './index.module.css';

const DEFAULT_TEA_SESSION = {
  name: '',
  amount: '',
  amountWestern: '',
  waterTemp: 70,
  infusions: [1],
  infusionsWestern: [1],
  defaultTimeIncrement: 0,
  defaultTimeIncrementWestern: 0,
  notes: ''
};


class IndexPage extends React.Component {
  state = {
    selectedTea: this.teas[0],
    userTeaSessions: [],
    userPreferences: {
      westernMethod: false,
    }
  };

  async componentDidMount() {
    const userTeaSessions = await getTeaSessions();
    const userPreferences = await getUserPreferences();
    this.setState({
      userTeaSessions,
      userPreferences,
    });
  }

  findTeaByName = name => {
    const found = this.teas.find(x => x.name === name);

    return found ? found : DEFAULT_TEA_SESSION;
  }

  handleAddCustomSession = () => {
    this.setState({ modalOpen: true });
  }

  handleCloseCustomSessionModal = () => {
    this.setState({ modalOpen: false });
  }

  get teas() {
    return [
      ...SUGGESTED_TIMES,
      ...NANNUOSHAN_TIMES,
      ...(this.state ? this.state.userTeaSessions : [])
    ];
  }

  handleTeaSelect = e => {
    this.setState({
      selectedTea: this.findTeaByName(e.target.value)
    })
  }

  handleBrewMethodSelect = async e => {
    const updatedPreferences = await saveUserPreferences(Object.assign(
      {},
      this.state.userPreferences,
      {
        westernMethod: e.target.checked
      },
    ));

    this.setState({
      userPreferences: updatedPreferences
    });
  }

  addCustomTeaSession = async (teaSession, persist) => {
    console.log('addCustomTeaSession:', teaSession);
    if (persist) {
      const updatedTeaSessions = await saveTeaSessions([
        ...this.state.userTeaSessions,
        teaSession
      ]);
      this.setState({ userTeaSessions: updatedTeaSessions });
    }
    this.setState({
      selectedTea: teaSession
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
                <button className={styles.button} onClick={this.handleAddCustomSession} title="Add a custom tea session">+</button>
              </div>
              <div className={styles.switchContainer}>
                Gong Fu &nbsp;<Switch onChange={this.handleBrewMethodSelect} value={this.state.userPreferences.westernMethod} /> &nbsp;  Western
              </div>
            </div>

            <TeaSession
              westernMethod={this.state.userPreferences.westernMethod}
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

            { this.state.modalOpen && (
              <CustomTeaSessionModal
                isOpen={this.state.modalOpen}
                onSave={this.addCustomTeaSession}
                onClose={this.handleCloseCustomSessionModal}
                contentLabel="Add a custom tea session"
                className="test"
              >
                Add a fasdfasdf
              </CustomTeaSessionModal>
            )}

          </Page>
      </Layout>
    );
  }
}

export default IndexPage;
