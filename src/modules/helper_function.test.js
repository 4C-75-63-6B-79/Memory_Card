import { shuffle } from "./helper_function";

test("returns an array of same length", () => {
    const array = [1,3,4,56,8,9];
    console.log(shuffle(array));
    expect(shuffle(array).length).toBe(array.length);
});