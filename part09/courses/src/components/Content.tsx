import { Course } from '../types';

interface ContentProps {
  parts: Course[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.parts.map((c) => (
        <p key={c.name}>
          {c.name} {c.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
