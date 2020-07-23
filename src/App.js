import React from 'react';
import SelectCatModal from './SelectCatModal';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
  
    this.state = {
      isModalOpen: false,
      currOwner: "",
      ownerCatCombo: [ { name:"DanG",  breed: '', image: '', hasCat: false },
          { name: "Jamez", breed: '', image: '', hasCat: false },
          { name: "Sam", breed: '', image: '', hasCat: false },
          { name:"Stjep", breed: '', image: '', hasCat: false },
          { name:"Chris", breed: '', image: '', hasCat: false },
          { name: "Rob", breed: '', image: '', hasCat: false },
          { name: "JB", breed: '', image: '', hasCat: false },
          { name:"Shuks", breed: '', image: '', hasCat: false },
          { name:"Pam", breed: '', image: '', hasCat: false } ],

    };
  }

  

  openModal = (e) => {
    this.setState({
      isModalOpen: true,
      currOwner: e.target.value
    });
  }


  
  onAddCatToOwner = (ownerName, breed, catImageUrl) => {
    const owners = [...this.state.ownerCatCombo];
    const owner = owners.filter(owner => owner.name === ownerName)[0];
    owner.breed = breed;
    owner.hasCat = true;
    owner.image = catImageUrl;

    this.setState({
      ownerCatCombo: owners,
      isModalOpen: false
    })
  }
 



  render(){
    const { ownerCatCombo } = this.state;
    console.log("breeds in render", this.state.breeds)
    return(
      <div className="App">
        <h1>Owners</h1>
        <table className="js-owner-table">
          <tbody>
            
            {ownerCatCombo.map(owner => (
              <tr id={`row-of-${owner.name}`}>
                <td id={owner.name} className={`js-${owner.name}-name-row`}>{owner.name} {owner.hasCat && "- Owns "+ owner.breed}</td>
                {!owner.hasCat && <button className={"js-open-modal-button-"+owner.name} onClick={ this.openModal } value={ owner.name }>Add cat</button>}
                <div className="js-cat-image-div">
                  {owner.hasCat && <img alt="cat" className="js-cat-image" src={owner.image} />}
                </div>
              </tr>
            ))}

          </tbody>
        </table>
        <SelectCatModal 
          open={ this.state.isModalOpen } 
          clickHandler={ this.onAddCatToOwner } 
          owner = { this.state.currOwner }
        />
      </div>
    );
  }
}


export default App;

