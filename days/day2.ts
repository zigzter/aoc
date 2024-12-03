const input = await Deno.readTextFile("./inputs/day2.txt");

export function parseInput(input: string) {
    return input
        .trim()
        .split("\n")
        .map((level: string) => level.split(" ").map(Number));
}

export function isUnsafeChange(
    prev: number,
    curr: number,
    isIncreasing: boolean,
) {
    const difference = Math.abs(prev - curr);
    return (
        difference > 3 ||
        difference < 1 ||
        (isIncreasing && prev > curr) ||
        (!isIncreasing && prev < curr)
    );
}

// Part 1
export function countSafeLevels(levels: number[][]) {
    let safeCount = 0;
    for (const level of levels) {
        let isSafe = true;
        const isIncreasing = level[0] < level[1];
        for (let i = 1; i < level.length; i++) {
            const curr = level[i];
            const prev = level[i - 1];
            if (isUnsafeChange(prev, curr, isIncreasing)) {
                isSafe = false;
                break;
            }
        }
        if (isSafe) {
            safeCount++;
        }
    }
    return safeCount;
}

console.log(countSafeLevels(parseInput(input)));

// Part 2
export function countSafeLevelsTolerance(levels: number[][]) {
    // Figure out overall increase or decrease trend of each level
    const isIncreasingMap: Record<string, boolean> = {};
    for (const level of levels) {
        let inc = 0;
        let dec = 0;
        for (let i = 1; i < level.length; i++) {
            const curr = level[i];
            const prev = level[i - 1];
            if (curr > prev) {
                inc++;
            } else if (curr < prev) {
                dec++;
            }
        }
        const key = level.join(",");
        isIncreasingMap[key] = inc > dec ? true : false;
    }

    let safeCount = 0;
    for (const level of levels) {
        const isIncreasing = isIncreasingMap[level.join(",")];
        const stack: number[] = [];
        for (let i = 0; i < level.length; i++) {
            const curr = level[i];
            const prev = stack[stack.length - 1];
            if (
                (!prev && isIncreasing && curr > level[i + 1]) ||
                (!prev && !isIncreasing && curr < level[i + 1]) ||
                isUnsafeChange(prev, curr, isIncreasing)
            ) {
                continue;
            }
            stack.push(curr);
        }
        if (Math.abs(level.length - stack.length) <= 1) {
            console.log("safe: ", level);
            safeCount++;
        } else {
            console.log("unsafe: ", level);
        }
    }
    return safeCount;
}
