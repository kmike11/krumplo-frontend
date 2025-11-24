export type UserRole = "ADMIN" | "USER";

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string | null;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface BoardSummary {
  id: string;
  name: string;
  description?: string | null;
  updatedAt: string;
  favorite?: boolean;
  memberCount?: number;
  columnCount?: number;
}

export interface CardLabel {
  id: string;
  name: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChecklistItem {
  id: string;
  content: string;
  completed: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface CardComment {
  id: string;
  content: string;
  author?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  mimeType?: string;
  uploadedBy?: User;
  createdAt: string;
}

export type CardPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type CardType = "TASK" | "BUG" | "STORY" | "EPIC";

export type SprintStatus = "PLANNED" | "ACTIVE" | "COMPLETED" | "CANCELLED";

export interface Sprint {
  id: string;
  name: string;
  goal?: string;
  startDate?: string;
  endDate?: string;
  status: SprintStatus;
  createdAt: string;
  updatedAt: string;
}

export interface BoardCard {
  id: string;
  title: string;
  description?: string | null;
  position: number;
  dueDate?: string | null;
  priority: CardPriority;
  type: CardType;
  storyPoints?: number;
  assignee?: User | null;
  reporter?: User | null;
  watchers: User[];
  labels: CardLabel[];
  checklistItems: ChecklistItem[];
  comments: CardComment[];
  attachments: Attachment[];
  sprint?: Sprint | null;
  createdAt: string;
  updatedAt: string;
}

export interface BoardColumn {
  id: string;
  title: string;
  position: number;
  cards: BoardCard[];
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  id: string;
  name: string;
  description?: string | null;
  owner?: User | null;
  members: User[];
  columns: BoardColumn[];
  labels: CardLabel[];
  sprints: Sprint[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateBoardInput {
  name: string;
  description?: string;
}

export interface CreateColumnInput {
  title: string;
  position?: number;
}

export interface CreateCardInput {
  title: string;
  description?: string;
  priority?: CardPriority;
  type?: CardType;
  dueDate?: string;
  storyPoints?: number;
  assigneeId?: string;
  reporterId?: string;
  labelIds?: string[];
}

export interface UpdateBoardInput {
  name?: string;
  description?: string;
}

export interface UpdateColumnInput {
  title?: string;
  position?: number;
}

export interface UpdateCardInput {
  title?: string;
  description?: string;
  priority?: CardPriority;
  type?: CardType;
  dueDate?: string;
  storyPoints?: number;
  assigneeId?: string;
  reporterId?: string;
  labelIds?: string[];
}

export interface MoveCardInput {
  targetColumnId: string;
  targetPosition?: number;
}

export interface ReorderColumnsInput {
  columnOrder: string[];
}
