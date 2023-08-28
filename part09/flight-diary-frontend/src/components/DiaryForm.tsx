import { useState } from 'react';
import axios from 'axios';
import { DiaryEntry } from '../types';
import { ValidationError, Weather, Visibility } from '../types';

const DiaryForm = ({ addDiary }: { addDiary: Function }) => {
  const [date, setDate] = useState('2023-05-06');
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
        date:&nbsp;
        <input
          name="date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        ></input>
        <br />
        visiblity:&nbsp;
        {Object.values(Visibility).map((v) => (
          <em key={v.toString()}>
            <input
              name="visibility"
              type="radio"
              value={v.toString()}
              onChange={(event) => setVisiblity(event.target.value)}
            />
            <label htmlFor={v.toString()}>{v.toString()}&nbsp;</label>
          </em>
        ))}
        <br />
        weather:&nbsp;
        {Object.values(Weather).map((w) => (
          <em key={w.toString()}>
            <input
              name="weather"
              type="radio"
              value={w.toString()}
              onChange={(event) => setWeather(event.target.value)}
            />
            <label htmlFor={w.toString()}>{w.toString()}&nbsp;</label>
          </em>
        ))}
        <br />
        comment:&nbsp;
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
