import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("When running the app", () => {
  const wrapper = shallow(<App />);
  const owners = ["Dan G", "Jame'z", "Sam", "Stjep", "Chris", "Rob", "JB", "Shuks"];
  // const ownerButtons = owners.map(name => ".js-modal-button-for-"+name);

  it("should render the app", () => {
    expect(wrapper.length).toBe(1);
  });

  it("should display a table of owners", () => {
    expect(wrapper.find(".js-owner-table").length).toBe(1);
  });

  it("should display a table with a row named after the owner & a button", () => {
    expect(wrapper.find(".js-open-modal-button").length).toBe(owners.length);
    //ownerButtons.forEach(owner => expect(wrapper.find(owner).length).toBe(1));
    console.log(wrapper.find(".js-open-modal-button"))
  
  });

  it("should not display the modal", () => {
    expect(wrapper.state().isModalOpen).toBe(false);
  });

  describe("When opening the modal", () => {
    const ownerButtons = Array.from(wrapper.find('.js-open-modal-button'));
    console.log(ownerButtons);

    beforeAll(() => {
      wrapper.find('.js-open-modal-button').at(0).simulate('click');
      // const ownerButtons = owners.map(name => ".js-modal-button-for-"+name);
      //ownerButtons.forEach(x => x.prop('onClick')());

    });

    it("the modal should be visible", () => {
      expect(wrapper.state().isModalOpen).toBe(true);
      expect(wrapper.find('.js-add-cat-to-owner-modal').length).toBe(1);
    });

    it("the modal should display a close button", () => {
      expect(wrapper.find(".js-close-modal-button").length).toBe(1);
    });
  });

});


