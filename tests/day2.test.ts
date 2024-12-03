import { assertEquals } from "jsr:@std/assert";
import {
    countSafeLevels,
    countSafeLevelsTolerance,
    isUnsafeChange,
    parseInput,
} from "../days/day2.ts";

const input = `
1 2 3 4
4 3 2 1
7 8 5 4
8 1 2 3
3 2 1 8
2 3 12 13
`;

Deno.test("parseInput", async (t) => {
    await t.step("Parses input", () => {
        const res = parseInput(input);
        assertEquals(res, [
            [1, 2, 3, 4],
            [4, 3, 2, 1],
            [7, 8, 5, 4],
            [8, 1, 2, 3],
            [3, 2, 1, 8],
            [2, 3, 12, 13],
        ]);
    });
});

Deno.test("isUnsafeChange", async (t) => {
    await t.step("Safe increasing", () => {
        const res = isUnsafeChange(4, 5, true);
        assertEquals(res, false);
    });

    await t.step("Safe decreasing", () => {
        const res = isUnsafeChange(5, 3, false);
        assertEquals(res, false);
    });

    await t.step("Unsafe increasing", () => {
        const res = isUnsafeChange(1, 10, true);
        assertEquals(res, true);
    });

    await t.step("Unsafe decreasing", () => {
        const res = isUnsafeChange(10, 1, false);
        assertEquals(res, true);
    });
});

Deno.test("countSafeLevels", async (t) => {
    await t.step("Counts safe levels", () => {
        const levels = parseInput(input);
        const res = countSafeLevels(levels);
        assertEquals(res, 2);
    });
});

Deno.test("countSafeLevelsTolerance", async (t) => {
    await t.step("Counts safe levels", () => {
        const levels = parseInput(input);
        const res = countSafeLevelsTolerance(levels);
        assertEquals(res, 5);
    });
});
