import React from 'react';

const Header = (props) => {
  return (
    <header className="page-header">
      <div className="container">
        <h1 className="page-title">
          {props.title}
        </h1>
      </div>
    </header>
  );
};

export default Header;
