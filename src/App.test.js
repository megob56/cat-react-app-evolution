import React from "react";
import { shallow } from "enzyme";
import App from "./App";

global.fetch = jest.fn(() => "default")
  .mockImplementationOnce(() => Promise.resolve({
		json: () =>
			Promise.resolve([
				{
          name: "catBreed",
				},
			]),
  }))
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

describe("When running the app", () => {
  const wrapper = shallow(<App />);
  const owners = ["Dan G", "Jame'z", "Sam", "Stjep", "Chris", "Rob", "JB", "Shuks"];

  it("should render the app", () => {
    expect(wrapper.length).toBe(1);
  });

  it("should display a table of owners", () => {
    expect(wrapper.find(".js-owner-table").length).toBe(1);
  });

  it("should display a table with a row named after the owner & a button", () => {
    expect(wrapper.find(".js-open-modal-button").length).toBe(owners.length);
  });

  it("should not display the modal", () => {
    expect(wrapper.state().isModalOpen).toBe(false);
  });

  describe("When opening the modal", () => {
    beforeAll(() => {
      //wrapper.find('.js-open-modal-button').at(0).simulate('click');
      wrapper.setState({isModalOpen: true});
      wrapper.setState({selectedBreed: "testBreed"});
      wrapper.setState({currOwner: "Meaghan"});
    });

    it("the modal should be visible", () => {
      expect(wrapper.state().isModalOpen).toBe(true);
      expect(wrapper.find('.js-add-cat-to-owner-modal').length).toBe(1);
    });

    it("the modal should display a close button & add cat button", () => {
      expect(wrapper.find(".js-close-modal-button").length).toBe(1);
      expect(wrapper.find(".js-add-cat-to-owner-button").length).toBe(1);
    });

    it("should make an api call", () => {
      expect(fetch).toHaveBeenCalledWith("https://api.thecatapi.com/v1/breeds");
    })

    it("should display a drop down list & submit button", () => {
      expect(wrapper.find('.js-select-cat-breed-menu').length).toBe(1);
      expect(wrapper.find('.js-submit-choice-button').length).toBe(1);
    });

    describe("When choosing a cat breed from the drop down list & hitting submit", () => {
      beforeAll(() => {
        wrapper.setState({selectedBreed: "test"});
        wrapper.setState({isModalOpen: true});
        wrapper.find('.js-submit-choice-button').at(0).simulate("click");
      });

      it("should call the api", () => {
        expect(fetch).toHaveBeenCalledWith(`https://api.thecatapi.com/v1/breeds/search?q=test`);
        expect(wrapper.state().breedId).toBe("breedID");
        expect(fetch).toHaveBeenCalledWith(`https://api.thecatapi.com/v1/images/search?breed_ids=breedID`);
      });

      it("should render all images of the selected breed in the modal", () => {
        expect(wrapper.state().catImage[0]).toBe("catImageURL");
      });
    });
  });

  describe("When clicking the add cat to owner button", () => {
    beforeAll(() => {
      wrapper.setState({isModalOpen: true});
      wrapper.setState({selectedBreed: "American Shorthair"});
      wrapper.find('.js-add-cat-to-owner-button').at(0).simulate("click");
    });
    it("should add the name of the cat next to the owners name in the track row", () => {
      expect(wrapper.find(".js-owner-name-row").at(0).text()).toBe("Dan G - American Shorthair");
    });
    it("should not allow you to add another cat to the same owner again", () => {
      expect(wrapper.find('js-open-modal-button').length).toBe(0);
    })
  });

  describe("When clicking the close modal button after adding a cat", () => {
    beforeAll(() => {
      wrapper.setState({isModalOpen: true});
      wrapper.find('.js-close-modal-button').at(0).simulate("click");
    })
    it("should no longer display the modal", () => {
      expect(wrapper.state().isModalOpen).toBe(false);
    });
  });

});


