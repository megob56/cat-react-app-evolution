import React from 'react';
import Modal from 'react-modal';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      isModalOpen: false,
      breeds: [],
      selectedBreed: "",
      breedId: [],
      catImage: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
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

   handleChange = (e) => {
    this.setState({ selectedBreed: e.target.value })
    //console.log(this.state.selectedBreed[0])
  }

  async onSubmit(){
    let initialIds = [];
    await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${this.state.selectedBreed}`)
      .then((response) => response.json())
      .then((data => {
        initialIds = data.map((x) => {
          return x.id
        });
        this.setState({breedId: initialIds});
      }));

    console.log(this.state.breedId)

    let initialCatImage = [];
    
    await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${this.state.breedId}`)
      .then((response) => response.json())
      .then((data => {
        initialCatImage = data.map((x) => {
          return x.url
        });
        this.setState({catImage: initialCatImage});
      }));

    console.log(`https://api.thecatapi.com/v1/images/search?breed_ids=${this.state.breedId}`);
    console.log(this.state.catImage);
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
            {owners.map((owner, i) => (
              <tr key={`row-of-${owner}`}>
                <td key={owner} className="js-owner-name-row">{owner} - {this.state.selectedBreed}</td>
                <button className={"js-open-modal-button"} onClick={ this.openModal }>Add cat</button>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={ this.state.isModalOpen } className="js-add-cat-to-owner-modal">
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
          <button className="js-add-cat-to-owner-button">Add</button>
          {this.state.catImage.map(image => (
            <div className = "js-cat-image-div">
              <img className="js-image-of-cat" src={image} alt = "Cat" />
            </div>
          ))}
          
        </Modal>
      </div>
    );
  }
}


export default App;

