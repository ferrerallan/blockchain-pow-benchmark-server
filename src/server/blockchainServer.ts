import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import Blockchain from "../lib/blockchain";
import Block from "../lib/block";
import colors from "colors";
const _PORT: number = 3000;

const app = express();

// if (process.argv.includes('--run')) {
//   app.use(morgan('tiny'));
// }

app.use(express.json());

const blockchain = new Blockchain();

app.get("/status", (req, res, next) => {
  res.json({
    numberOfBlocks: blockchain.blocks.length,
    isValid: blockchain.isValid().success,
    lastBlock: blockchain.getLastBlock(),
  });
});

app.get("/blocks/next", (req: Request, res: Response, next: NextFunction) => {
  const now = new Date();
  const timeString = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}}`;  
  res.json(blockchain.getNextBlock());
});

app.get("/blocks/:indexOrHash", (req, res, next) => {
  let block;
  if (/^[0-9]+$/.test(req.params.indexOrHash))
    block = blockchain.blocks[parseInt(req.params.indexOrHash)];
  else block = blockchain.getBlock(req.params.indexOrHash);

  if (!block) return res.sendStatus(404);
  else return res.json(block);
});

app.post("/blocks", (req, res, next) => {
  if (req.body.hash === undefined) return res.sendStatus(422);

  const block = new Block(req.body as Block);
  const validation = blockchain.addBlock(block);

  if (validation.success) {
    console.log(colors.cyan(`ACCEPTED Hash: ${req.body.hash}`));
    res.status(201).json(block);
  } else {
    res.status(400).json(validation);
  }
});

if (process.argv.includes("--run")) {
  app.listen(_PORT, () => {
    console.log(`Blockchain server is running at ${_PORT}`);
  });
}

export { app };
