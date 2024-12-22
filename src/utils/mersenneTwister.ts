// Mersenne Twister implementation for deterministic random number generation
export class MersenneTwister {
  private MT: number[];
  private index: number;

  constructor(seed: number) {
    this.MT = new Array(624);
    this.index = 0;
    this.MT[0] = seed >>> 0;
    
    for (let i = 1; i < 624; i++) {
      this.MT[i] = (0x6c078965 * (this.MT[i-1] ^ (this.MT[i-1] >>> 30)) + i) >>> 0;
    }
  }

  private twist(): void {
    for (let i = 0; i < 624; i++) {
      const y = (this.MT[i] & 0x80000000) + (this.MT[(i+1) % 624] & 0x7fffffff);
      this.MT[i] = this.MT[(i + 397) % 624] ^ (y >>> 1);
      if (y % 2 !== 0) {
        this.MT[i] = this.MT[i] ^ 0x9908b0df;
      }
    }
  }

  public random(): number {
    if (this.index === 0) {
      this.twist();
    }

    let y = this.MT[this.index];
    y = y ^ (y >>> 11);
    y = y ^ ((y << 7) & 0x9d2c5680);
    y = y ^ ((y << 15) & 0xefc60000);
    y = y ^ (y >>> 18);

    this.index = (this.index + 1) % 624;
    return y >>> 0;
  }
}