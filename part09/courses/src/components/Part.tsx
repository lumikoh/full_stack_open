import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <>
          <em>{part.description}</em>
        </>
      );
    case 'group':
      return (
        <>
          <em>project exercises {part.groupProjectCount}</em>
        </>
      );
    case 'background':
      return (
        <>
          <em>{part.description}</em>
          <br />
          <em>submit to {part.backgroundMaterial}</em>
        </>
      );
    case 'special':
      return (
        <>
          <em>{part.description}</em>
          <br />
          required skills: {part.requirements.join(', ')}
        </>
      );
    default:
      return null;
  }
};

export default Part;
