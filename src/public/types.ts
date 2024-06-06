export interface IRace {
    // foreign
    event_id: string,
    circuit_id: string,
    game_id: string,
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
    race_id: string,
    vehicle_id: string,
    // attributes
    position_qualifying_overall: number,
    position_race_overall: number,
    position_qualifying_class?: number,
    position_race_class?: number,
}

export interface IEvent {
    // attributes
    name: string,
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
