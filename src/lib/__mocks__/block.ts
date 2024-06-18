import Validation from '../validation';

export default class Block {
  index: number;
  hash: string;
  timestamp: number;
  data: string;
  previousHash: string;
  nonce: number;
  miner: string;


  constructor(block?: Block) {
    this.index = block?.index || 0;
    this.timestamp = block?.timestamp || Date.now();
    this.data = block?.data || '';
    this.previousHash = block?.previousHash || '';
    this.hash = block?.hash || this.getHash();
    this.nonce = block?.nonce || 0;
    this.miner = block?.miner || '';
  }

  getHash() {
    return this.hash || 'abc';
  }




  isValid(previousHash: string, previousIndex: number): Validation {
    console.log('validate mock block');
    if(!previousHash || previousIndex <0 || this.index <0)
        return new Validation(false, 'Invalid mock block');
    return new Validation(true, '');
  }
}
