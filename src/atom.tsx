import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// for save in localStorage
const {persistAtom} = recoilPersist({
	key: 'sessionStorage',
  storage: sessionStorage,
});

export interface IToDo {
	id: number;
	text: string;
}

interface IToDoState {
	[key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
		"To Do": [],
		Doing: [],
		Done: [],
	},
	effects_UNSTABLE: [persistAtom],
});

