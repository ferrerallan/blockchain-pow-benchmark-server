'use strict';

import Block from './block';
import Validation from './validation';
import BlockInfo from './blockInfo';
import colors from "colors";

export default class Blockchain {
  blocks: Block[];
  nextItem: number = 0;
  static readonly DIFFICULTY_FACTOR = 15;
  static readonly TX_PER_BLOCK = 2;
  static readonly MAX_DIFFICULTY = 62;

  constructor() {
    this.blocks = [new Block({ data: '000' } as Block)];
    this.nextItem++;
  }

  getLastBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }

  getDifficulty(): number {
    // return Math.ceil(this.blocks.length / Blockchain.DIFFICULTY_FACTOR);
    return 5;
  }

  addBlock(block: Block): Validation {
    const lastBlock = this.getLastBlock();

    const validation = block.isValid(
      lastBlock.hash,
      lastBlock.index,
      this.getDifficulty()
    );
    if (!validation.success) {
      console.log(colors.red(validation.message));
      
      return new Validation(false, validation.message);
    }
    this.blocks.push(block);
    this.nextItem++;
    return new Validation(true, '');
  }

  getBlock(hash: string): Block | undefined {
    return this.blocks.find((item) => item.hash === hash);
  }

  isValid(): Validation {
    for (let i = this.blocks.length - 1; i > 0; i--) {
      const block = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      const validation = block.isValid(
        previousBlock.hash,
        previousBlock.index,
        this.getDifficulty()
      );

      if (!validation.success)
        return new Validation(
          false,
          `invalid block ${block.index}: ${validation.message}`
        );
    }
    return new Validation(true, '');
  }

  getFeePerTx(): number {
    return 1;
  }

  getNextBlock(): BlockInfo | null {
    const data = new Date().toString()
   
    const difficulty = this.getDifficulty();
    const previousHash = this.getLastBlock().hash;
    const index = this.blocks.length;
    const feePerTx = this.getFeePerTx();
    const maxDifficulty = Blockchain.MAX_DIFFICULTY;
    return {
      data,
      difficulty,
      previousHash,
      index,
      feePerTx,
      maxDifficulty,
    } as BlockInfo;
  }
}
