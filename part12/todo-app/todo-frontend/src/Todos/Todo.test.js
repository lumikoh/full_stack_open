import React from 'react';
import '@testing-library/jest-dom';
import Todo from './Todo';
import { render, screen } from '@testing-library/react';

describe('<Todo />', () => {
  const mockComplete = jest.fn()
  const mockDelete = jest.fn()

  let container

  beforeEach(() => {
    const todo = {done: true, text: "TestTodo"}
    container = render(<Todo todo={todo} onClickComplete={mockComplete} onClickDelete={mockDelete}/>).container
  })

  test('Todo is rendered', async () => {

    const element = screen.getByText("TestTodo")

    expect(element).toBeDefined()
  })
})