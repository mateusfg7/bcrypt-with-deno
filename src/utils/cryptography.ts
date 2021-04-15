import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts';

export default {
  async getHash(string: string, salt?: string): Promise<string> {
    if (salt) {
      return await bcrypt.hash(string, salt);
    }

    return await bcrypt.hash(string);
  },

  async checkHash(string: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(string, hash);
  },
};
