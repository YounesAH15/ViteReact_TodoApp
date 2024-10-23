export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  archivedAt?: string;
}

export interface TodoStats {
  active: number;
  completed: number;
  archived: number;
}