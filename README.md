# 4me.flight.positions

[![build status](https://gitlab.com/devteamreims/4me.flight.positions/badges/master/build.svg)](https://gitlab.com/devteamreims/4me.flight.positions/commits/master)

## API

```
/?callsigns[]=AZA11Y&callsigns[]=AFR2015
```

Returns :
```
[
  {
    callsign: AZA11Y,
    position: {
      lat: xxx, (decimal)
      long: xxx, (decimal)
      altitude: xxx (feet)
    }
  }, ...
]
```

## Configuration

Configuration is passed via ENV variables.
```
SQL_HOST : hostname of the SQL server
SQL_DB : name of the database used
SQL_TABLE : name of the table containing flight positions
SQL_USER : login used to connect to the SQL server
SQL_PASSWORD : password used to connect to the SQL server
POSITION_MAX_AGE : Our SQL table will keep rows for flights not tracked by our radars anymore for a period of 10 minutes. This is far too long. This option will force the webservice to return an empty position if SQL position is older than POSITION_MAX_AGE
```

## SQL Schema
Expected columns :
```
id : primary key
arcid: aircraft callsign
modec: altitude (FL)
lat: lattitude
long: longitude
end_timestamp: timestamp of the last known position
```
