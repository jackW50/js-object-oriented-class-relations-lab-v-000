let store = {
  drivers: [],
  passengers: [],
  trips: []
};

let driverID = 0;
let passengerID = 0;
let tripID = 0;

class Driver {
  constructor(name) {
    this.name = name;
    this.id = ++driverID;

    store.drivers.push(this);
  }

  trips() {
    return store.trips.filter( function (trip) {
      return trip.driverId === this.id;
    }.bind(this))
  }

  passengers() {
    const passengerIds = this.trips().map( trip => { return trip.passengerId });

    return store.passengers.filter( function(passenger) {
      return passengerIds.includes(passenger.id);
    })
  }

}

class Passenger {
  constructor(name) {
    this.name = name;
    this.id = ++passengerID;

    store.passengers.push(this);
  }

  trips() {
    return store.trips.filter( trip => {
      return trip.passengerId === this.id;
    })
  }

  drivers() {
    const driverIds = this.trips().map( trip => { return trip.driverId});

    return store.drivers.filter ( driver => {
      return driverIds.includes(driver.id);
    })
  }
}

class Trip {
  constructor(driver, passenger) {
    this.id = ++tripID;

    if (driver) {
      this.setDriver(driver);
    }

    if (passenger) {
      this.setPassenger(passenger);
    }


    store.trips.push(this)
  }

  setDriver(driver) {
    return this.driverId = driver.id;
  }

  setPassenger(passenger) {
    this.passengerId = passenger.id;
  }

  passenger() {
    return store.passengers.find (function(passenger) {
      return this.passengerId === passenger.id;
    }.bind(this))
  }

  driver() {
    return store.drivers.find (function(driver) {
      return this.driverId === driver.id;
    }.bind(this))
  }
}
