import express from 'express';
import {getData} from './fetch';
import d from 'debug';
const debug = d('4me.flight.positions.routes');

import _ from 'lodash';

import { getStatus as getServiceStatus } from './status';

export default function getRoutes() {

  let router = express.Router();


  router.get('/', getFlightsPosition);

  router.get('/status', getStatus);

  return router;
};

function getFlightsPosition(req, res, next) {
  let callsigns = [];
  if(req.query.callsigns !== undefined) {
    callsigns = req.query.callsigns;
  }

  const positions = {
    lastFetched: Date.now(),
    flights: []
  };

  const callsignFilter = (flight) => _.includes(callsigns, flight.callsign);

  const byCallsign = (callsign) => (flight) => flight.callsign === callsign;

  const emptyLocation = {
    lat: 0,
    long: 0,
    alt: 0,
    when: Date.now(),
  };

  getData(callsigns)
    .then(rawData => {
      const flights = _.map(callsigns, callsign => {
        const sqlFlight = _.find(rawData, {callsign});
        return Object.assign({}, {callsign}, emptyLocation, sqlFlight);
      });

      return flights;
    })
    .then(data => res.send(data))
    .catch(next);

}

function getStatus(req, res, next) {
  res.send(getServiceStatus());
}


