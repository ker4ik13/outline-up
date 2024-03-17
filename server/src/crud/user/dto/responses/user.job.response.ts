import { UserJob } from 'src/types/user';

export class UserJobResponse implements UserJob {
  company?: string;
  position: string;
  from?: string;
  to?: string;

  constructor(userJob: UserJob) {
    this.company = userJob.company;
    this.position = userJob.position;
    this.from = userJob.from;
    this.to = userJob.to;
  }
}
