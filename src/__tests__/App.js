import React from "react";
import App from "../App";
import Applications from "../Features/Applications/Applications";
import Login from "../Features/Authentication/Login";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import Register from "../Features/Authentication/Register";
import Postings from "../Features/Postings/Postings";
import RecruiterPostings from "../Features/Recruiter/Postings/RecruiterPostings";
import ViewPostingApplications from "../Features/Recruiter/Postings/ViewPostingApplications";

it("invalid path should not render anything", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/amibug"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(Applications)).toHaveLength(0);
});

it("login route should work", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(Login)).toHaveLength(1);
});

it("register route should work", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/register"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(Register)).toHaveLength(1);
});

it("applications route should work", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/applications"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(Applications)).toHaveLength(1);
});

it("postings route should work", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/postings"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(Postings)).toHaveLength(1);
});


it("recruiter route should work", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/recruiter"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(RecruiterPostings)).toHaveLength(1);
});


it("apps for posting should be viewable for recruiter", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/recruiter/postings/123213"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(ViewPostingApplications)).toHaveLength(1);
});
