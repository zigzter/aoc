const input = await Deno.readTextFile("./inputs/day1.txt");

const ids = input.split(/[\s\n]+/);
const ids1: number[] = [];
const ids2: number[] = [];

const counts: Record<string, number> = {};

ids.forEach((id, index) => {
    if (!id) {
        return;
    }
    const numberID = Number(id);
    if (index % 2 === 0) {
        ids1.push(numberID);
    } else {
        ids2.push(numberID);
        if (!(id in counts)) {
            counts[id] = 0;
        }
        counts[id]++;
    }
});

ids1.sort((a, b) => a - b);
ids2.sort((a, b) => a - b);

let part1 = 0;
let part2 = 0;
for (let i = 0; i < ids1.length; i++) {
    part1 += Math.abs(ids1[i] - ids2[i]);
    part2 += ids1[i] * (counts[ids1[i]] || 0);
}

console.log(part1);
console.log(part2);
