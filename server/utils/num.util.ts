/**
 * Returns a random whole number between `min` and `max`,
 * `min` and `max` are inclusive.
 * `min` & `max` must be whole numbers
 * @param min - whole number & `< max`
 * @param max - whole number & `> min`
 */
export const rand = (min: number, max: number) =>
    Math.floor(Math.random() * ((max + 1) - min)) + min;