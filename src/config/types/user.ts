import accountType from "./accountTypes";

interface IUser {
  email: string;
  password: string;
  type: accountType;
  links: {
    github: string;
    linkedin: string;
  };
}

export default IUser;
