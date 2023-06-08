const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part}/>)}   
    <p><b>total of {parts.reduce((accumulator, currentValue) => accumulator += currentValue.exercises, 0)} exercises</b></p>
  </>

const Course = ({course}) => (

  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
  </div>
)

export default Course