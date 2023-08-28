import { useState } from 'react';
import axios from 'axios';
import { DiaryEntry } from '../types';
import { ValidationError } from '../types';

const DiaryForm = ({ addDiary }: { addDiary: Function }) => {
  const [date, setDate] = useState('');
  const [visibility, setVisiblity] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [notification, setNotification] = useState('');

  const addNewDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary = {
      date,
      visibility,
      weather,
      comment,
    };
    axios
      .post<DiaryEntry>('http://localhost:3001/api/diaries', newDiary)
      .then((response) => {
        addDiary(response.data);
      })
      .catch((e) => {
        if (axios.isAxiosError<ValidationError, Record<string, unknown>>(e)) {
          if (e.response && e.response.data) {
            const message = String(e.response.data);
            setNotification(message);
            setTimeout(() => {
              setNotification('');
            }, 5000);
          }
        } else {
          setNotification('Error: something went wrong.');
          setTimeout(() => {
            setNotification('');
          }, 5000);
        }
      });

    setDate('');
    setVisiblity('');
    setWeather('');
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {notification !== '' && <p style={{ color: 'red' }}>{notification}</p>}
      <form onSubmit={addNewDiary}>
        date
        <input
          name="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        ></input>
        <br />
        visiblity
        <input
          name="visibility"
          value={visibility}
          onChange={(event) => setVisiblity(event.target.value)}
        ></input>
        <br />
        weather
        <input
          name="weather"
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
        ></input>
        <br />
        comment
        <input
          name="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        ></input>
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
