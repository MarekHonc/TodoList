/**
 * Výčet všech možných stavů úkolů.
 */
 export enum status {
    open = 0,
    in_progress = 10,
    done = 20
}

/**
 * Výčet všech možných priorit úkolů.
 */
export enum priority {
    minor = 0,
    normal = 10,
    major = 20,
    critical = 30
}