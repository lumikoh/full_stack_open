import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  parts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.parts.map((c) => (
        <p key={c.name}>
          <b>
            {c.name} {c.exerciseCount}
          </b>
          <br />
          <Part part={c} />
        </p>
      ))}
    </>
  );
};

export default Content;
