import React from 'react';
import Modal from 'react-modal';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
  
    this.state = {
      isModalOpen: false,
      currOwner: "",
      breeds: [],
      selectedBreed: "",
      breedId: null,
      catImages: "",
      loading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  openModal = (e) => {
    this.setState({
      isModalOpen: true,
      currOwner: e.target.value
    });
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      selectedBreed: "",
      catImages: ""
    });
  }

   handleChange = (e) => {
    this.setState({ selectedBreed: e.target.value })
    //console.log(this.state.selectedBreed[0])
  }

  async onSubmit(){
    this.setState({
      loading: true,
      catImages: "",
    });

      await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${this.state.selectedBreed}`)
        .then((response) => response.json())
        .then((data) => this.setState({ breedId: data[0].id }));
       
    console.log(this.state.breedId)

      await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${this.state.breedId}`)
        .then((response) => response.json())
        .then((data => {
          this.setState({catImages: data[0].url});
      }));
    
    
      this.setState({loading: false})

    console.log(`https://api.thecatapi.com/v1/images/search?breed_ids=${this.state.breedId}`);
    console.log(this.state.catImages);
  }

  onAddCatToOwner = () => {
    this.setState({

    })
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
    const owners = ["Dan G", "Jame'z", "Sam", "Stjep", "Chris", "Rob", "JB", "Shuks"];

    return(
      <div className="App">
        <h1>Owners</h1>
        <table className="js-owner-table">
          <tbody>
            {owners.map(owner => (
              <tr id={`row-of-${owner}`}>
                <td id={owner} className={`js-${owner}-name-row`}>{owner} </td>
                <button className={"js-open-modal-button"} onClick={ this.openModal } value={ owner }>Add cat</button>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={ this.state.isModalOpen } className="js-add-cat-to-owner-modal">
          <h1>Choose a cat for {this.state.currOwner}</h1>
          <button className="js-close-modal-button" onClick={ this.closeModal }>Close</button>
          <div className = "js-select-menu-div">
            <select className='js-select-cat-breed-menu' onChange={ this.handleChange } value = { this.state.selectedBreed }>
                  <option>Choose One...</option>
                  {this.state.breeds.map(breed => (
                      <option key={breed} value={breed}>
                          {breed}
                      </option>
                  ))}
            </select>
            <button className="js-submit-choice-button" onClick={ this.onSubmit }>Submit</button>
          </div>
          <div className = "js-cat-image-div">
              {this.state.loading && <img className="loading-symbol" alt="loading" src={"https://thumbs.gfycat.com/PotableEmbarrassedFrenchbulldog-small.gif"}/>}
              {this.state.catImages && <img className="js-image-of-cat" src={this.state.catImages} alt = "Cat" />}
              {this.state.catImages && <button className="js-add-cat-to-owner-button">Add</button>}
          </div>
         
          
        </Modal>
      </div>
    );
  }
}


export default App;

