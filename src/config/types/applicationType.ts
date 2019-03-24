interface IApplication {
  application_id: number;
  comment?: string;
  company: string;
  date: Date;
  date_posted: Date;
  deadline: Date;
  is_inhouse_posting: boolean;
  position: string;
  resume: string;
  status: string;
  url: string;
  user_id: string;
}

export default IApplication;
