export type PageKey = "studio" | "chat" | "roundtable" | "network" | "connections" | "dataset" | "settings";

export type StudioTab = "profiling" | "avatar" | "calibration";

export type ChatMessage = {
  id: number;
  author: string;
  role?: string;
  type?: string;
  content: string;
  fromUser?: boolean;
};

export type AvatarProfile = {
  name: string;
  role: string;
  owner: string;
  background: string;
  tags: string[];
  category: string;
  connection: string;
  invited: number;
  responseTime: string;
};

export type RoundtableProject = {
  title: string;
  status: string;
  avatars: number;
  unread: number;
  question: string;
};

export type ProfilingTask = {
  name: string;
  progress: number;
  samples: number;
  status: string;
};
