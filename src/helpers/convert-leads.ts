import { LeadType, RawLeadType } from '../types/lead-type';

export default async function convertLeads(
  raw: RawLeadType[],
): Promise<LeadType[]> {
  const promises = raw.map((item) => ({
    date: new Date(item.created_by),
    id: item.id,
    statusID: item.status_id,
    statusName: '',
    tutorId: item.responsible_user_id,
    tutorName: '',
    name: item.name,
    budget: item.price,
    pipeline: item.pipeline_id,
    color: '',
  }));
  return Promise.all(promises);
}
