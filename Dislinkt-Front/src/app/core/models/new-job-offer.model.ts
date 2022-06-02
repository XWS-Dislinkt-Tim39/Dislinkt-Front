export interface NewJobOffer {
  startDateTime:Date,
  endDateTime:Date,
  publisherId: string,
  positionName: string,
  description: string,
  dailyActivities: string[],
  requirements: string[]
}
