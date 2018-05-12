import path from 'path';

import MPQ from 'blizzardry/lib/mpq';
import glob from 'globby';

const dataDir = process.env.DATA_DIR;

const mpqs = [
  'common.MPQ',
  'common-2.MPQ',
  'expansion.MPQ',
  'lichking.MPQ',
  '*/locale-*.MPQ',
  '*/speech-*.MPQ',
  '*/expansion-locale-*.MPQ',
  '*/lichking-locale-*.MPQ',
  '*/expansion-speech-*.MPQ',
  '*/lichking-speech-*.MPQ',
  '*/patch-*.MPQ',
  'patch.MPQ',
  'patch-*.MPQ',
];

const patterns = mpqs.map(mpq => (
  path.join(dataDir, mpq)
));

const archives = glob.sync(patterns);

const mpq = MPQ.open(archives.shift(), MPQ.OPEN.READ_ONLY);
archives.forEach((archive) => {
  mpq.patch(archive, '');
});

export default mpq;
