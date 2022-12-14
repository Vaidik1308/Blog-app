import React from 'react';
import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <div>
      <h2>Page not Found</h2>
      <p>Well, that's disappointing.</p>
      <p>
        <Link to="/">Visit Our Homepage</Link>
      </p>
    </div>
  )
}

export default Missing