import { useRecoilState, useRecoilValue } from 'recoil';
import { minuteState, hourSelector } from './atoms';


function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  const onMinutesChange = (e:React.FormEvent<HTMLInputElement>) => {
    setMinutes(+e.currentTarget.value); // +str => Number(str)
  }
  const onHoursChange = (e:React.FormEvent<HTMLInputElement>) => {
    setHours(+e.currentTarget.value); // +str => Number(str)
  }

  return (
    <div>
      <input value={minutes} onChange={onMinutesChange} type="number" placeholder='Minutes' />
      <input value={hours} onChange={onHoursChange} type="number" placeholder='Hours' />
    </div>
  );
}

export default App;
