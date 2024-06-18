'use strict';

import Block from './block';
import Validation from '../validation';

export default class Blockchain {
  blocks: Block[];
  nextItem: number = 0;

  constructor() {
    this.blocks = [new Block({
        data: 'Genesis Block',
        index: 0,
        timestamp: Date.now(),
        previousHash: '',
        hash: 'abc'
    } as Block)];
    this.nextItem++;
  }

  getLastBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }

  addBlock(block: Block): Validation {
    if (block.index < 0) return new Validation(false, 'Invalid mock block index');

    this.blocks.push(block);
    this.nextItem++;

    return new Validation(true, '');
  }

  getBlock(hash: string): Block | undefined {
    return this.blocks.find(item=> item.hash === hash);
  }

  isValid(): Validation {
    return new Validation();
  }

  
}
