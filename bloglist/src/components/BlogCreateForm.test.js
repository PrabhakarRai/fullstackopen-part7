import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogCreateForm from './BlogCreateForm';

describe('<BlogCreateForm />', () => {
  let component;
  const mockHandler = jest.fn();
  beforeEach(() => {
    component = render(
      <BlogCreateForm formSubmitHandler={mockHandler} />
    );
  });
  test('Calls the sumbit handler with right details for creating new blog', () => {
    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    const form = component.container.querySelector('.blogCreateForm');
    fireEvent.change(author, {
      target: { value: 'author of the test' }
    });
    fireEvent.change(title, {
      target: { value: 'testing of forms could be easier' }
    });
    fireEvent.change(url, {
      target: { value: 'https://test.react.com/' }
    });
    fireEvent.submit(form);
    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toBe('author of the test' );
    expect(mockHandler.mock.calls[0][1]).toBe('testing of forms could be easier' );
    expect(mockHandler.mock.calls[0][2]).toBe('https://test.react.com/' );
  });
});