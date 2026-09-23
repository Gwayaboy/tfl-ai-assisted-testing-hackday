// Shared test data for the baseline suite.
// A realistic-sized pool of search terms so the data-driven specs generate a
// large (~300) number of tests - just like a real, sprawling regression pack.

export const SEARCH_TERMS: string[] = [
  "Sonic the Hedgehog 3", "Sonic", "Batman", "Spider-Man", "Frozen", "Inside Out",
  "Moana", "Wicked", "Gladiator", "Dune", "Oppenheimer", "Barbie", "Avatar",
  "Interstellar", "Inception", "Titanic", "Joker", "Deadpool", "Wonka",
  "Kung Fu Panda", "Mufasa", "Venom", "Furiosa", "Twisters", "Alien", "Nosferatu",
  "The Matrix", "Toy Story", "Up", "Coco", "Encanto", "Elemental", "Luca",
  "Soul", "Onward", "Cars", "Ratatouille", "WALL-E", "Brave", "Tangled",
];

// A handful of titles we expect to exist for "happy path" checks.
export const KNOWN_MOVIES: string[] = [
  "Sonic the Hedgehog 3", "Moana", "Wicked", "Mufasa",
];

// Nonsense queries that should return nothing.
export const NONSENSE_TERMS: string[] = [
  "ZZZQQQ111", "NotARealMovieXYZ", "1234567890abcdef", "%%%%%",
];

// Themes to toggle (duplicated coverage on purpose).
export const THEMES: string[] = ["dark", "light", "dark", "light"];
