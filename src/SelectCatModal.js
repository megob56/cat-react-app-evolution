import React from 'react';
import Modal from 'react-modal';

import './SelectCatModal.css';


export default class SelectCatModal extends React.Component {

    constructor(props){
        super(props);

        this.state = { 
            catImages: [],
            breeds: [],
            selectedBreed: "",
            selectedCatImageUrl: "",
        }
    }


    onBreedSelected = async(e) => {
        this.setState({
          loading: true,
          selectedBreed: e.target.value 
        });
    
        let imagesSet = new Set();

        await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${e.target.value}`)
            .then((response) => response.json())
            .then((data) => this.setState({ breedId: data[0].id }));
        
        console.log(this.state.breedId)
    
        for(let i = 0; i < 10; i++){
            await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${this.state.breedId}`)
                .then((response) => response.json())
                .then((data => {
                    data.forEach(x=> imagesSet.add(x.url));
            }));
        }
        
        this.setState({
            catImages: Array.from(imagesSet),
            loading: false
        })
    
        console.log(`https://api.thecatapi.com/v1/images/search?breed_ids=${this.state.breedId}`);
        console.log(this.state.catImages);
      }
    
    
     
    onAddToCatOwner = (e) => {
    
        const owner = this.props.owner;
        const breed = this.state.selectedBreed;

        const catImageUrl = e.target.value;
        
        console.log(catImageUrl);
       
        this.props.clickHandler(owner, breed, catImageUrl);

        this.state.breeds.splice(this.state.breeds.findIndex(x => x === this.state.selectedBreed), 1);
        
        this.setState({ selectedBreed: "", catImages: [], breeds: this.state.breeds});
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
            console.log('in component did mount', this.state.breeds);
        }));
    }

    render(){
        return(
            <Modal isOpen={ this.props.open } className="js-add-cat-to-owner-modal">
                <h1>Choose a cat for {this.props.owner}</h1>
                <div className="js-select-menu-div">
                    <select className="js-select-cat-breed-menu"  value = { this.state.selectedBreed } onChange={this.onBreedSelected}>
                        <option>Choose One...</option>
                        {this.state.breeds.map(breed => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option> 
                        ))} 
                    </select>
                </div>
                {this.state.catImages.map(imgUrl => (
                        <div className="js-cat-image-div">
                        <img src={imgUrl} alt="Cat"/>
                        <button className="js-add-cat-to-owner-button" onClick={ this.onAddToCatOwner } value={ imgUrl }>Add Cat to Owner</button>
                    </div>
                ))}
                  
            </Modal>
        )
    }
}

