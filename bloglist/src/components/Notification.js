import React from 'react';
import { useSelector } from 'react-redux';

export const ErrorNotification = () => {
  const notification = useSelector((state) => state);

  if (
    notification === null
    || notification.content === ''
    || notification.type !== 'ERROR' ) {
    return null;
  }
  return (
    <div className="error">
      {notification.content}
    </div>
  );
};


export const SuccessNotification = () => {
  const notification = useSelector((state) => state);

  if (
    notification === null
    || notification.content === ''
    || notification.type !== 'SUCCESS' ) {
    return null;
  }
  return (
    <div className="success">
      {notification.content}
    </div>
  );
};