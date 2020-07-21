import React from "react";
import { shallow } from "enzyme";

import SelectCatModal from "./SelectCatModal";

global.fetch = jest.fn(() => "default")
  .mockImplementationOnce(() => Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: "breedID",
        },
      ]),
  })) 
  .mockImplementationOnce(() => Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          url: "catImageURL",
        },
      ]),
  }));

describe("When opening the modal", () => {
    const breeds = ["cat1", "cat2", "cat3"];
    const currOwner = "Meaghan";
    const isModalOpen = true;
    const catImageUrl = ["catImage1Url", "catImage2Url", "catImage3Url"];
    const wrapper = shallow(<SelectCatModal breeds = {breeds} owner = {currOwner} open={isModalOpen}/>);
    
    beforeAll(() => {
      wrapper.setState({selectedBreed: "testBreed"});
      wrapper.setState({catImages: ["catImage1", "catImage2", "catImage3"]});
    });

    it("the modal should be visible", () => {
      expect(wrapper.find('.js-add-cat-to-owner-modal').length).toBe(1);
    });

    it("the modal should display an add cat button", () => { 
      expect(wrapper.find(".js-add-cat-to-owner-button").length).toBe(catImageUrl.length);
    });

    it("should display a drop down list", () => {
      expect(wrapper.find('.js-select-cat-breed-menu').length).toBe(1);
    });

    describe("When choosing a cat breed from the drop down list", () => {
      beforeAll(() => {
        wrapper.find('.js-select-cat-breed-menu').simulate('change', { target: {value:'test'} });
      
      });

      it("should call the api", () => {
        expect(fetch).toHaveBeenCalledWith(`https://api.thecatapi.com/v1/breeds/search?q=test`);
        expect(wrapper.state().breedId).toBe("breedID");
        expect(fetch).toHaveBeenCalledWith(`https://api.thecatapi.com/v1/images/search?breed_ids=breedID`);
      });

      it("should render all images of the selected breed in the modal", () => {
        expect(wrapper.state().catImages).toStrictEqual(["catImage1", "catImage2", "catImage3"]);
      });
    });
  });