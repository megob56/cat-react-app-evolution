import React from 'react';
import SelectCatModal from './SelectCatModal';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
  
    this.state = {
      isModalOpen: false,
      breeds: [],
      currOwner: "",
      addCat: false,
   
      // owners: [ { name:"DanG",  breed: 'placeholder', image: '', hasCat: false },
      //     { name: "Jamez", breed: '', image: '', hasCat: false },
      //     { name: "Sam", breed: '', image: '', hasCat: false },
      //     { name:"Stjep", breed: '', image: '', hasCat: false },
      //     { name:"Chris", breed: '', image: '', hasCat: false },
      //     { name: "Rob", breed: '', image: '', hasCat: false },
      //     { name: "JB", breed: '', image: '', hasCat: false },
      //     { name:"Shuks", breed: '', image: '', hasCat: false },
      //     { name:"Pam", breed: '', image: '', hasCat: false }]

    };

    // this.setState({ this.state.owners[0].breed: "haaaiiiii"})
    // console.log(this.state.owners[0].breed)

    this.ownerCatCombo = {
      DanG: { breed: '', image: '', hasCat: false },
      Jamez: { breed: '', image: '', hasCat: false },
      Sam: { breed: '', image: '', hasCat: false },
      Stjep: { breed: '', image: '', hasCat: false },
      Chris: { breed: '', image: '', hasCat: false },
      Rob: { breed: '', image: '', hasCat: false },
      JB: { breed: '', image: '', hasCat: false },
      Shuks: { breed: '', image: '', hasCat: false },
      Pam: { breed: '', image: '', hasCat: false },
    }

  // let owners = [ { name:"DanG",  breed: '', image: '', hasCat: false },
  //     Jamez: { breed: '', image: '', hasCat: false },
  //     Sam: { breed: '', image: '', hasCat: false },
  //     Stjep: { breed: '', image: '', hasCat: false },
  //     Chris: { breed: '', image: '', hasCat: false },
  //     Rob: { breed: '', image: '', hasCat: false },
  //     JB: { breed: '', image: '', hasCat: false },
  //     Shuks: { breed: '', image: '', hasCat: false }]
  

  

  }


  // toggleModal = () => {
  //   this.setState(state => ({
  //     isModalOpen: !state.isModalOpen
  //   }))

  //   this.setState({currOwner})
  // }
  

  openModal = (e) => {
    this.setState({
      isModalOpen: true,
      currOwner: e.target.value
    });
  }

  // closeModal = () => {
  //   this.setState({
  //     isModalOpen: false,
  //     selectedBreed: "",
  //     catImages: ""
  //   });
  // }

  
  onAddCatToOwner = (owner, breed, catImageUrl) => {
    this.ownerCatCombo[owner].breed = breed;
    this.ownerCatCombo[owner].hasCat = true;
    this.ownerCatCombo[owner].image = catImageUrl;

    this.setState({
          isModalOpen: false,
    });
  }
 

  componentDidMount() {
    let initialBreeds = [];
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data => {
        initialBreeds = data.map((x) => {
          return x.name
        });

        this.setState({breeds: initialBreeds});
    }));
  }


  render(){

    return(
      <div className="App">
        <h1>Owners</h1>
        <table className="js-owner-table">
          <tbody>
            {Object.keys(this.ownerCatCombo).map(owner => (
              <tr id={`row-of-${owner}`}>
                <td id={owner} className={`js-${owner}-name-row`}>{owner} {this.ownerCatCombo[owner].hasCat && "- Owns "+ this.ownerCatCombo[owner].breed}</td>
                {!this.ownerCatCombo[owner].hasCat && <button className={"js-open-modal-button-"+owner} onClick={ this.openModal } value={ owner }>Add cat</button>}
                <div className="js-cat-image-div">
                  {this.ownerCatCombo[owner].hasCat && <img alt="cat" className="js-cat-image" src={this.ownerCatCombo[owner].image} />}
                </div>
               
              </tr>
            ))}
          </tbody>
        </table>
        <SelectCatModal 
          open={ this.state.isModalOpen } 

          // onChange={ this.changeBreed } 
          // submit={ this.onSubmit }
          clickHandler={ this.onAddCatToOwner } 
          breeds = { this.state.breeds }
          owner = { this.state.currOwner }
        />
      </div>
    );
  }
}


export default App;

