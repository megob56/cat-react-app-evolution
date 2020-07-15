import React from 'react';
import Modal from 'react-modal';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      isModalOpen: false,
    };
  }

  openModal = () => {
    this.setState({
      isModalOpen: true
    });
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false
    });
  }


  render(){
    const owners = ["Dan G", "Jame'z", "Sam", "Stjep", "Chris", "Rob", "JB", "Shuks"];
    return(
      <div className="App">
        <h1>Owners</h1>
        <table className="js-owner-table">
          <tbody>
            {owners.map(owner => (
              <tr key={`row-of-${owner}`}>
                <td key={owner}>{owner}</td>
                <button className={"js-open-modal-button"} onClick={ this.openModal }>Add cat</button>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={ this.state.isModalOpen }>
          <button className="js-close-modal-button" onClick={ this.closeModal }></button>
        </Modal>
      </div>
    );
  }
}



export default App;

