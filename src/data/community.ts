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
    description: "Managed chapter media and communications.",
  },
  {
    organization: "English Club",
    role: "Assistant Leader",
    description: "Supported events, operations, and member engagement.",
  },
  {
    organization: "Erasmus Club",
    role: "Assistant Leader",
    description: "Coordinated program activities and international engagement.",
  },
  {
    organization: "Animal Husbandry Community",
    role: "Event & Leadership Responsibility",
    description: "Organized and led community events.",
  },
];
