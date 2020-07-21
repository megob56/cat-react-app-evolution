import React from "react";
import { shallow } from "enzyme";
import SelectCatModal from "./SelectCatModal";

import App from "./App";

// global.fetch = jest.fn(() => "default")
//   .mockImplementationOnce(() => Promise.resolve({
// 		json: () =>
// 			Promise.resolve([
// 				{
//           name: "American Shorthair", 
//         },
//         {
//           name: "Bengal",
//         },
//         {
//           name: "Siamese",
// 				},
// 			]),
//   }));
  // .mockImplementationOnce(() => Promise.resolve({
  //   json: () =>
  //     Promise.resolve([
  //       {
  //         id: "breedID",
  //       },
  //     ]),
  // })) 
  // .mockImplementationOnce(() => Promise.resolve({
  //   json: () =>
  //     Promise.resolve([
  //       {
  //         url: "catImageURL",
  //       },
  //     ]),
  // }));

// describe("When running the app", () => {
//   const wrapper = shallow(<App />);
//   // afterAll(() => {
//   //   wrapper.unmount();
//   // })

//   it("should render the app", () => {
//     expect(wrapper.length).toBe(1);
//   });

//   it("should display a table of owners", () => {
//     expect(wrapper.find(".js-owner-table").length).toBe(1);
//   });

//   it("should display a table with a row named after the owner & a button", () => {
//     expect(wrapper.find(".js-open-modal-button-DanG").length).toBe(1);
//   });

//   it("should not display the modal", () => {
//     expect(wrapper.state().isModalOpen).toBe(false);
//   });

// });

// describe("When clicking the close modal button after adding a cat", () => {
//   const wrapper = shallow(<App />);
//   beforeAll(() => {
//     wrapper.setState({isModalOpen: false});
//   })
//   it("should no longer display the modal", () => {
//     expect(wrapper.state().isModalOpen).toBe(false);
//   });
// });

describe("When a cat has already been added", () => {
  let wrapper;
  beforeAll(() => {
    fetch.mockResponseOnce(JSON.stringify([{name: "American Shorthair"},{name: "Bengal"},{name: "Siamese"}]))
    wrapper = shallow(<App />);
    
    wrapper.find(SelectCatModal).invoke("clickHandler")("DanG","American Shorthair","CatImageUrl");
  });
  
  it("should not allow you to add another cat to the same owner again", () => {
    wrapper.update();
    expect(wrapper.find('js-open-modal-button-DanG').length).toBe(0);
  });
  it("the selected cat should no longer be visible in the list of breeds", async () => {
    await wrapper.update();
    
    expect(wrapper.find(SelectCatModal).props().breeds).toStrictEqual(['Bengal', 'Siamese']);
  });
});

// describe("When the component mounts", () => {
    
//   it("should make an api call", () => {
//     expect(fetch).toHaveBeenCalledWith("https://api.thecatapi.com/v1/breeds");
//   });
  
// });


// describe("When clicking the add cat to owner button & a cat has not previously been added", () => {
//   const wrapper = shallow(<App />);
//   beforeAll(() => {  
//     wrapper.instance().onAddCatToOwner("DanG", "American Shorthair", "catImageUrl");
//   });

//   it("should add the name of the cat next to the owners name in the track row", () => {
//     expect(wrapper.find(".js-DanG-name-row").text()).toBe("DanG - Owns American Shorthair");
//   });
// });

