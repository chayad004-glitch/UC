
export enum EventDuration {
  ONE_DAY = "1 Day",
  TWO_DAYS = "2 Days"
}

export interface BDE {
  id: string;
  name: string;
  contact: string;
}

export interface PermissionLetterData {
  id: string;
  societyName: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  eventDuration: EventDuration;
  eventAmount: string;
  accountDetails: string;
  isDoorToDoor: boolean;
  selectedItems: string[];
  plateCount: string;
  bdeName: string;
  bdeContact: string;
  createdAt: number;
}

export type AppView = 'FORM' | 'PREVIEW' | 'HISTORY';
