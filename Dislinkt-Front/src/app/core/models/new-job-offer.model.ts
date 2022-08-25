import { AppSkill } from "./app-skill.model";

export interface NewJobOffer {
  startDateTime:Date,
  endDateTime:Date,
  publisherId: string,
  positionName: string,
  description: string,
  dailyActivities: string[],
  requirements: AppSkill[],
  seniority:string,
  followersId:string[]
}
