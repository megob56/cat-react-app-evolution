import React from 'react';
import Modal from 'react-modal';


export class SelectCatModal extends React.Component {

    render(){
        return(
            <Modal>
                <h1>Choose a cat for someone</h1>
                <button className="js-close-modal-button">X</button>
                <div className="js-select-menu-div">
                    <select className="js-select-cat-breed-menu" >
                        <option>Choose One...</option>
                    </select>
                    <button className="js-submit-choice-button">Submit</button>
                </div>
                <div className="js-cat-image-in-modal-div"></div>
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