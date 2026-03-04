export const connectionSafeUserSelect = {
  id: true,
  email: true,
  userName: true,
  githubUrl: true,
  age: true,
  gender: true,
  skills: true,
  bio: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type ConnectionSafeUser = {
  id: string;
  email: string;
  userName: string;
  githubUrl: string;
  age: number;
  gender: string;
  skills: string[];
  bio: string;
  createdAt: Date;
  updatedAt: Date;
};
