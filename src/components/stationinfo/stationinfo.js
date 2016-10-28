import React from 'react';

export const Stationinfo = ({name, abbr, city, zipcode, address}) =>
  name && abbr && city && zipcode &&
  <div>
    <div>Official Name: {name}</div>
    <div>Address<br />
      {address}<br />
      {city}<br />
      {zipcode}<br />
    </div>
  </div>;

Stationinfo.propTypes = {
  abbr: React.PropTypes.string.isRequired,
  address: React.PropTypes.string.isRequired,
  city: React.PropTypes.string.isRequired,
  county: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  zipcode: React.PropTypes.string.isRequired,
};

export default Stationinfo;
