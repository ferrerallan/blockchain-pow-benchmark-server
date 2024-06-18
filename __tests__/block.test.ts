import { describe, test, expect, beforeAll } from '@jest/globals';
import Block from '../src/lib/block';

describe('Block tests', () => {
  const exampleDifficulty: number = 0;
  const exampleMiner: string = 'minerallan';
  let genesisBlock: Block;

  beforeAll(() => {
    genesisBlock = new Block({ data: 'Genesis Block' } as Block);
  });

  test('Should be valid', () => {
    const block = new Block({
      index: 1,
      data: 'data',
      previousHash: genesisBlock.hash,
    } as Block);

    block.mine(exampleDifficulty, exampleMiner);
    const valid = block.isValid(
      genesisBlock.hash,
      genesisBlock.index,
      exampleDifficulty
    ).success;

    expect(valid).toBe(true);
  });

  test('Should not be valid', () => {
    const block = new Block({
      index: 1,
      data: 'data',
      previousHash: genesisBlock.hash,
    } as Block);

    const valid = block.isValid(
      genesisBlock.hash,
      genesisBlock.index,
      exampleDifficulty
    ).success;

    expect(valid).toBe(false);
  });

  test('Should not be valid index', () => {
    const block = new Block({
      index: -1,
      data: 'data',
      previousHash: genesisBlock.hash,
    } as Block);
    const valid = block.isValid(
      genesisBlock.hash,
      genesisBlock.index,
      exampleDifficulty
    ).success;

    expect(valid).toBe(false);
  });

  test('has generated hash', () => {
    const block = new Block({
      index: 1,
      data: 'data',
      previousHash: genesisBlock.hash,
    } as Block);
    console.log(block.hash);
    expect(block.hash).not.toEqual('');
    expect(block.hash).not.toBeNull();
  });
});
