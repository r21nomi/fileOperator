import fs from "fs";
import { program } from "commander";

program
  .option("-from, --from <id>", "id from", "0")
  .option("-to, --to <id>", "id to", "2999")
  .option("-ids, --ids [ids...]", "ids")
  .parse(process.argv);

const options = program.opts();
const fromId = parseInt(options.from);
const toId = parseInt(options.to);
console.log(options);

const BASE_OUTPUT_DIR = "output";

let outputDir = "";
let windowSize;
const getIdName = (id) => {
    return id;
};

const copyImage = async (tokenId) => {
    fs.copyFile('input/placeholder.png', `output/${getIdName(tokenId)}.png`, (err) => {
        if (err) throw err;
        console.log('ファイルをコピーしました');
    });
};

const generateNumberArray = (from, to) => {
    if (from > to) {
        throw new Error(`from: ${from} is greater than to: ${to}.`);
    }
    const size = to - from + 1;
    return [...Array(size)].map((_, i) => from + i);
};

const createOutputDirIfNeeded = () => {
    outputDir = `${BASE_OUTPUT_DIR}`;
    // Create directory first if it doesn't exist.
    if (!fs.existsSync(BASE_OUTPUT_DIR)){
        fs.mkdirSync(BASE_OUTPUT_DIR);
    }
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir);
    }
};

const startGeneration = (ids) => {
    (async() => {
        const startDate = new Date();

        createOutputDirIfNeeded();

        for await (const id of ids) {
            try {
                await copyImage(id);
                console.log(id);
            } catch (e) {
                console.log("error...");
                console.log(e);
            }
        }

        console.log(`start: ${startDate}\ncomplete: ${new Date()}`);
    })();
};

if (options.ids && options.ids.length > 0) {
    const ids = options.ids.map((id) => parseInt(id));
    startGeneration(ids);
} else {
    const ids = generateNumberArray(fromId, toId);
    startGeneration(ids);
}