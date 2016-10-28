import React from 'react';

export const Stationinfo = ({name, abbr, city, county, zipcode, address}) =>
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
  city: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  zipcode: React.PropTypes.string.isRequired,
  address: React.PropTypes.string.isRequired,
  county: React.PropTypes.string,
};

export default Stationinfo;
