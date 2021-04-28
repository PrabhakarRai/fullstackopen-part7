import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  const mockHandler = jest.fn();
  const blog = {
    id: 'TP3R',
    title: 'Testing Blog Component',
    author: 'Tester',
    url: 'https://www.theprabhakar.in/',
    likes: 5,
    user: {
      id: 'FP6V',
      username: 'test',
      name: 'test user',
    },
  };
  beforeEach(() => {
    component = render(
      <Blog
        data={blog}
        username={blog.user.username}
        updateLikesHandler={mockHandler}
        deleteBlogHandler={mockHandler}
      />
    );
  });
  test('Title and Author are rendered initially', () => {
    expect(component.container).toHaveTextContent('Testing Blog Component');
    expect(component.container).toHaveTextContent('Tester');
    expect(component.container).not.toHaveTextContent('https://www.theprabhakar.in/');
    expect(component.container).not.toHaveTextContent('5');
  });
  test('Title, Author, URL & Likes are rendered when view button is clicked', () => {
    const button = component.container.querySelector('button');
    fireEvent.click(button);
    expect(component.container).toHaveTextContent('Testing Blog Component');
    expect(component.container).toHaveTextContent('Tester');
    expect(component.container).toHaveTextContent('https://www.theprabhakar.in/');
    expect(component.container).toHaveTextContent('5');
  });
  test('Two (Like) Button clicks calls handler twice', () => {
    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);
    const likeButton = component.getByText('Like This Blog');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});