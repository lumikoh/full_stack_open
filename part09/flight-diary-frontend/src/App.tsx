import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import axios from 'axios';

const App = () => {
  //const [newDiary, setNewDiary] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get<DiaryEntry[]>('http://localhost:3001/api/diaries')
      .then((response) => {
        setDiaries(response.data);
      });
  }, []);

  return (
    <div>
      <div>
        <h2>Diary entries</h2>
        {diaries.map((d) => (
          <div key={d.id}>
            <h3>{d.date}</h3>
            <p>
              visiblity: {d.visibility}
              <br />
              weather: {d.weather}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

