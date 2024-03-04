import React from 'react';

const OneAparHome = ({ data }) => {
  return (
    <div>
      <h1>Data from API</h1>
      <ul>
        {/* Display details from the data prop */}
        <li>{data}</li> {/* Adjust this line based on your data structure */}
      </ul>
    </div>
  );
};

export default OneAparHome;