import MPQChain from 'blizzardry/lib/mpq/chain.js';

const dataDir = process.env.DATA_DIR;
const mpq = MPQChain.build(dataDir);

export default mpq;
