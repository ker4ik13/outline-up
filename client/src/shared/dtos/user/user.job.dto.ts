import type { UserJob } from "@/shared/types/user";

export class UserJobDto implements UserJob {
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
