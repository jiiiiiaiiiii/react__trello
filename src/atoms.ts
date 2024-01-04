import { atom, selector } from 'recoil';

export const minuteState = atom({
	key: 'minutes',
	default: 0,
})

export const hourSelector = selector<number>({
	key: 'hours',
	get: ({get}) => {
		const minutes = get(minuteState);
		return (minutes / 60);
	},
	set: ({set}, newValue) => {
		const minutes = Number(newValue) * 60;
		set(minuteState, minutes);
		//set(수정하고 싶은 recoil atom, 변경 후 새로운 값)
	},
})