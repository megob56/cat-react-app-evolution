import React from "react";
import { shallow } from "enzyme";
import App from "./App";



describe("When running the app", () => {
  const wrapper = shallow(<App />);
 

  it("should render the app", () => {
    expect(wrapper.length).toBe(1);
  });

  it("should display a table of owners", () => {
    expect(wrapper.find(".js-owner-table").length).toBe(1);
  });

  it("should display a table with a row named after the owner & a button", () => {
    expect(wrapper.find(".js-open-modal-button-DanG").length).toBe(1);
  });

  it("should not display the modal", () => {
    expect(wrapper.state().isModalOpen).toBe(false);
  });

});

describe("When clicking the close modal button after adding a cat", () => {
  const wrapper = shallow(<App />);
  beforeAll(() => {
    wrapper.setState({isModalOpen: false});
  })
  it("should no longer display the modal", () => {
    expect(wrapper.state().isModalOpen).toBe(false);
  });
});


describe("When a cat has already been added", () => {
  let wrapper;
  beforeAll(() => {
    fetch.mockResponseOnce(JSON.stringify([{name: "American Shorthair"},{name: "Bengal"},{name: "Siamese"}]))
    wrapper = shallow(<App />);
    
    wrapper.update();

    // wrapper.find(SelectCatModal).invoke("clickHandler")("DanG","American Shorthair","CatImageUrl");
    wrapper.instance().onAddCatToOwner("DanG", "American Shorthair", "catImageUrl");
  });

  
  it("should not allow you to add another cat to the same owner again", () => {
    wrapper.update();
    console.log("DID THIS WORKS", wrapper.text());
    expect(wrapper.find('.js-open-modal-button-DanG').length).toBe(0);
    expect(wrapper.find('.js-open-modal-button-Sam').length).toBe(1);
    
  });

});


describe("When clicking the add cat to owner button & a cat has not previously been added", () => {
  const wrapper = shallow(<App />);
  beforeAll(() => {  
    wrapper.instance().onAddCatToOwner("DanG", "American Shorthair", "catImageUrl");
  });

  it("should add the name of the cat next to the owners name in the track row", () => {
    expect(wrapper.find(".js-DanG-name-row").text()).toBe("DanG - Owns American Shorthair");
  });
});

