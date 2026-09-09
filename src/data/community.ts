// Community — campus and community leadership roles (all PAST roles).

export interface CommunityEntry {
  organization: string;
  role: string;
  description: string;
}

export const community: CommunityEntry[] = [
  {
    organization: "AIESEC",
    role: "Media Responsibility",
    description: "Managed media and communications for university AIESEC chapter.",
  },
  {
    organization: "English Club",
    role: "Assistant Leader",
    description: "Supported club operations, event organization, and member engagement.",
  },
  {
    organization: "Erasmus Club",
    role: "Assistant Leader",
    description: "Assisted with coordination of Erasmus program activities and international student engagement.",
  },
  {
    organization: "Animal Husbandry Community",
    role: "Event & Leadership Responsibility",
    description: "Organized and led community events and activities.",
  },
];