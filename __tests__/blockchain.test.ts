import { describe, test, expect, jest } from '@jest/globals';
import Blockchain from '../src/lib/blockchain';
import Block from '../src/lib/block';

jest.mock('../src/lib/block');

describe('Block tests', () => {
  test('Should has genesis block', () => {
    const blockchain = new Blockchain();

    expect(blockchain.blocks.length).toEqual(1);
  });

  test('Should be valid', () => {
    const blockchain = new Blockchain();

    expect(blockchain.isValid().success).toEqual(true);
  });

  test('Should be valid', () => {
    const blockchain = new Blockchain();
    blockchain.addBlock(
      new Block({
        index: 1,
        data: 'data',
        previousHash: blockchain.blocks[0].hash,
      } as Block)
    );

    expect(blockchain.isValid().success).toEqual(true);
  });

  test('Should add block', () => {
    const blockchain = new Blockchain();
    blockchain.addBlock(
      new Block({
        index: 1,
        data: 'data',
        previousHash: blockchain.blocks[0].hash,
      } as Block)
    );

    expect(blockchain.isValid().success).toEqual(true);
  });

  test('Should not add block', () => {
    const blockchain = new Blockchain();
    blockchain.addBlock(
      new Block({
        index: 1,
        data: 'data',
        previousHash: blockchain.blocks[0].hash,
      } as Block)
    );

    const block = new Block({
      index: -1,
      data: 'data',
      previousHash: blockchain.blocks[0].hash,
    } as Block);

    blockchain.addBlock(block);

    blockchain.blocks[0].index = -1;

    expect(blockchain.isValid().success).toEqual(false);
  });
});
