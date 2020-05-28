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
    },
    canMode: false,
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

  findTeaById = id => {
    return this.state.userTeaSessions.find(x => x.id === id);
  }

  handleAddCustomSession = () => {
    this.setState({ modalOpen: true });
  }

  handleCloseCustomSessionModal = () => {
    this.setState({ modalOpen: false, editing: false });
  }

  handleEditClick = () => {
    this.setState({
      editing: true
    }, () => {
      this.handleAddCustomSession();
    })
  }

  get teas() {
    return [
      ...SUGGESTED_TIMES,
      ...(this.canMode ? NANNUOSHAN_TIMES : []),
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

  // Rename/refactor
  addCustomTeaSession = async (teaSession, persist) => {
    if (persist) {
      let updatedTeaSessions;
      const newId = Date.now();

      if (teaSession.id) {
        const index = this.state.userTeaSessions.findIndex(x => x.id === teaSession.id);
        updatedTeaSessions = [
          ...this.state.userTeaSessions.slice(0, index),
          teaSession,
          ...this.state.userTeaSessions.slice(index + 1)
        ];
      } else {
        updatedTeaSessions = [
          ...this.state.userTeaSessions,
          {
            ...teaSession,
            id: newId
          }
        ];
      }

      await saveTeaSessions(updatedTeaSessions);
      this.setState({
        userTeaSessions: updatedTeaSessions,
        selectedTea: teaSession.id ? teaSession : {
          ...teaSession,
          id: newId
        }
      });
      return;
    }
    this.setState({
      selectedTea: teaSession
    })
  }

  removeCustomTeaSession = async (id) => {
    const filtered = await saveTeaSessions(this.state.userTeaSessions.filter(x => x.id !== id))
    this.setState({
      userTeaSessions: filtered,
      selectedTea: this.teas[0]
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
              onEditClick={this.handleEditClick}
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
                onDelete={this.removeCustomTeaSession}
                onClose={this.handleCloseCustomSessionModal}
                contentLabel="Add a custom tea session"
                className="test"
                editing={this.state.editing}
                {...(this.state.editing ? this.state.selectedTea: {})}
              />
            )}

          </Page>
      </Layout>
    );
  }
}

export default IndexPage;
