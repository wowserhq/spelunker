import MPQChain from 'blizzardry/lib/mpq/chain';

const dataDir = process.env.DATA_DIR;
const mpq = MPQChain.build(dataDir);

export default mpq;
