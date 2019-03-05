import StatusTypes from "../types/statusTypes";

const status: { [index: string]: string } = {
  [StatusTypes.TO_APPLY]: "#C0C0C0",
  [StatusTypes.APPLIED]: "#00FFFF",
  [StatusTypes.CHALLENGE]: "#43C6DB",
  [StatusTypes.PHONE]: "#E2A76F",
  [StatusTypes.ONSITE]: "#806517",
  [StatusTypes.REJECTED]: "#FF0000",
  [StatusTypes.OFFER]: "#4AA02C"
};

export default status;
