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
import ViewPosting from "../Features/Postings/ViewPosting";
import OpenApplication from "../Features/Applications/OpenApplication";
import ResumeUpload from "../Features/ResumeUpload/Upload";
import Dashboard from "../Features/Dashboard/Dashboard";

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

it("individual postings viewable", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/postings/12412"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(ViewPosting)).toHaveLength(1);
});

it("open application", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/applications/123123"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(OpenApplication)).toHaveLength(1);
});

it("resume", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/resume"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(ResumeUpload)).toHaveLength(1);
});

it("dashboard", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(Dashboard)).toHaveLength(1);
});
