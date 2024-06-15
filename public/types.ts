export interface IUser {
    id?: string,
    email: string,
    password?: string,
    picture: string,
    username: string,
    last_login?: number,
    register_date: number,
    races: IUserRace[],
}

export interface IUserRace {
    id?: string,
    game: string,
    event: string,
    circuit: string,
    vehicle: string,
    position_qualifying_overall: number,
    position_race_overall: number,
    position_qualifying_class?: number,
    position_race_class?: number,
}

