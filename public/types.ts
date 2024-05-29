export interface IRace {
    // foreign
    event_id: number,
    circuit_id: number,
    game_id: number,
    // attributes
    start_date: number,
}

export interface IUser {
    // attributes
    email: string,
    password: string,
    last_login?: number,
    register_date: number,
    races: IUserRace[],
}

export interface IUserRace {
    // foreign
    race_id: number,
    vehicle_id: number,
    // attributes
    position_qualifying_overall: number,
    position_race_overall: number,
    position_qualifying_class: number,
    position_race_class: number,
}

export interface IEvent {
    // attributes
    name: string,
    number_of_races: number,
    organizers: string[],
}

export interface IVehicle {
    // attributes
    class: string,
    name: string,
}

export interface IGame {
    // attributes
    name: string,
    release_date?: number,
}

export interface ICircuit {
    // attributes
    name: string,
}
