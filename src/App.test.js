import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("When running the app", () => {
  const wrapper = shallow(<App />);

  it("should render the app", () => {
    expect(wrapper.length).toBe(1);
  });
  
});


