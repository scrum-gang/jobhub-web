import StatusTypes from "../types/statusTypes";

const status: { [index: string]: string } = {
  [StatusTypes.TO_APPLY]: "#80cbc4",
  [StatusTypes.APPLIED]: "#0097a7",
  [StatusTypes.CHALLENGE]: "#00bcd4",
  [StatusTypes.PHONE]: "#03a9f4",
  [StatusTypes.ONSITE]: "#cddc39",
  [StatusTypes.REJECTED]: "#dd2c00",
  [StatusTypes.OFFER]: "#00C853"
};

export default status;
