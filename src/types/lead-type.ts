export type LeadType = {
  name: string;
  id: number;
  tutorName: string;
  tutorId: number;
  statusID: number;
  pipeline: number;
  statusName: string;
  budget: number;
  date: Date;
  color: string;
};

export type RawLeadType = {
  name: string;
  id: number;
  responsible_user_id: number;
  status_id: number;
  pipeline_id: number;
  created_by: number;
  price: number;
};
