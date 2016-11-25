import React from 'react';

export const showExtraInfo = (data) =>
  <div dangerouslySetInnerHTML={{ __html: data }} />;

export const Stationinfo = ({ name, abbr, city, zipcode, address, stationExtraInfo }) => {
  if (!(name && abbr && city && zipcode)) return null;
  let
    attraction,
    crossStreet,
    food,
    intro,
    // link,
    // northRoutes,
    platformInfo,
    shopping,
    // southRoutes,
    station;
  try {
    station = stationExtraInfo.stations[0].station[0];
    attraction = station.attraction[0];
    crossStreet = station.cross_street[0];
    food = station.food[0];
    intro = station.intro[0];
    // northRoutes = station.north_routes[0];
    platformInfo = station.platform_info[0];
    shopping = station.shopping[0];
    // link = station.link[0];
    // southRoutes = station.south_routes[0];
  } catch (err) {
    // do nothing
    appFuncs.console()(`error instation info ${err}`);
  }

  return <div>
    {intro && <div>{showExtraInfo(intro)} <br /></div>}
    <div>
      Address<br />
      {address}<br />
      {city}<br />
      {zipcode}<br />
      <section>
        <h3>Additional Information about {name}</h3>
        {attraction && showExtraInfo(attraction)}
        {crossStreet && showExtraInfo(crossStreet)}
        {food && showExtraInfo(food)}
        {platformInfo && showExtraInfo(platformInfo)}
        {shopping && showExtraInfo(shopping)}
      </section>
    </div>
  </div>;
};

Stationinfo.propTypes = {
  abbr: React.PropTypes.string.isRequired,
  address: React.PropTypes.string.isRequired,
  city: React.PropTypes.string.isRequired,
  county: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  stationExtraInfo: React.PropTypes.object,
  zipcode: React.PropTypes.string.isRequired,
};

export default Stationinfo;
