import React from 'react'

const Header = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Part = ({part}) => {
  return (
      <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({course}) => {
  return (
    <div>
      {course.parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Total = ({course}) => {
  return (
    <div>
      <p>total of {course.parts.map(part => part.exercises).reduce((tot, cur) => tot + cur, 0)} exercises</p>
    </div>
  )
}

const Course = ({course}) => {
  return (
  <div>
    <Header course={course} />
    <Content  course={course}/>
    <Total course={course}/>
  </div>
  )
}

export default Course