import React from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';

import './SelectCatModal.css';


export default class SelectCatModal extends React.Component {

    constructor(props){
        super(props);

        this.state = { 
            catImages: [],
            selectedBreed: "",
        }
    }

    

    // submitCatBreedChoice = (e) => {
    //     e.preventDefault();

    //     const { loading, catImage } = this.state;
    //     const { onClick } = this.props;

    //     onClick(catImage, loading);

    //     this.setState({ loading: false, catImage: ""});
    // }

    // handleComponentMount = () => {
    //     const { breeds } = this.state;


    //     this.setState({ breeds: [] })
    // }

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
    
    
     
    onAddToCatOwner = () => {
        const node = ReactDOM.findDOMNode(this);
        const owner = this.props.owner;
        const breed = node.querySelector('.js-select-cat-breed-menu').value; 
        const catImageUrl = this.state.catImages[0];
       
        this.props.clickHandler(owner, breed, catImageUrl)

        this.setState({ selectedBreed: "", catImages: []});
    }

    render(){
        return(
            <Modal isOpen={ this.props.open }>
                <h1>Choose a cat for {this.props.owner}</h1>
                {/* <button className="js-close-modal-button" >X</button> */}
                <div className="js-select-menu-div">
                    <select className="js-select-cat-breed-menu"  value = { this.state.selectedBreed } onChange={this.onBreedSelected}>
                        <option>Choose One...</option>
                        {this.props.breeds.map(breed => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option> 
                        ))} 
                    </select>
                    {/* <button className="js-submit-choice-button" onClick={ this.onSubmit }>Submit</button> */}
                </div>
                {/* <div className="js-cat-image-div"> */}
                    {this.state.catImages.map(imgUrl => (
                         <div className="js-cat-image-div">
                            <img src={imgUrl} alt="Cat"/>
                            <button className="js-add-cat-to-owner-button" onClick={ this.onAddToCatOwner }>Add Cat to Owner</button>
                        </div>
                    ))}
                    {/* <button className="js-add-cat-to-owner-button" onClick={ this.onAddToCatOwner }>Add Cat to Owner</button> */}
                {/* </div> */}
            </Modal>
        )
    }
}

{/* <Modal isOpen={ this.state.isModalOpen } className="js-add-cat-to-owner-modal">
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
              {<button className="js-add-cat-to-owner-button" onClick={ this.onAddCatToOwner }>Add</button>}
          </div>    
        </Modal> */}