
export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  iframeUrl: string;
}

export type Category = 'All' | 'Action' | 'Sports' | 'Puzzle' | 'Strategy' | 'Arcade' | 'Multiplayer';

export const CATEGORIES: Category[] = ['All', 'Action', 'Sports', 'Puzzle', 'Strategy', 'Arcade', 'Multiplayer'];
