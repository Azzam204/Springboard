// part one

class Vehicle {
    constructor(make,model,year){
        this.make = make;
        this.model = model;
        this.year = year;
    }

    honk(){
        return "Beep."
    }

    toString(){
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}.`
    }
}

// part two

class Car extends Vehicle {
    numWheels = 4;
}

// part three

class Motorcycle extends Vehicle {
    numWheels = 2;
    revEngine(){
        return 'VROOM!!!'
    }
}

// part four

class Garage {
    constructor (limit){
        this.limit = limit;
        this.vehicles = [];
    }
    add(vehicle){
        if (this.vehicles.length >= this.limit) {
            return "Sorry, we're full."
        }
        else if (vehicle.year) {
            this.vehicles.push(vehicle);
            return 'Vehicle added!'
        }
        else {
            return "Only vehicles are allowed in here!"
        }
    }
}