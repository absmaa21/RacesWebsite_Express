export interface IRace {
    // primary
    race_id: number,
    // foreign
    event_id: number,
    circuit_id: number,
    game_id: number,
    // attributes
    start_date: number,
}

export interface IUser {
    // primary
    user_id: number,
    // attributes
    email: string,
    password: string,
    last_login?: number,
    register_date: number,
}

export interface IUserRace {
    // primary + foreign
    race_id: number,
    user_id: number,
    // foreign
    vehicle_id: number,
    // attributes
    position_qualifying_overall: number,
    position_race_overall: number,
    position_qualifying_class: number,
    position_race_class: number,
}

export interface IEvent {
    // primary
    event_id: number,
    // attributes
    name: string,
    number_of_races: number,
}

export interface IOrganizer {
    // primary
    organizer_id: number,
    // attributes
    name: string,
}

export interface IVehicle {
    // primary
    vehicle_id: number,
    // foreign
    class_id: number,
    // attributes
    name: string,
}

export interface IClass {
    // primary
    class_id: number,
    // attributes
    name: string,
}

export interface IGame {
    // primary
    game_id: number,
    // attributes
    name: string,
    release_date?: number,
}

export interface ICircuit {
    // primary
    circuit_id: number,
    // attributes
    name: string,
}

export interface IRaceClass {
    // primary + foreign
    race_id: number,
    class_id: number,
}

export interface IEventOrganizer {
    // primary + foreign
    event_id: number,
    organizer_id: number,
}
