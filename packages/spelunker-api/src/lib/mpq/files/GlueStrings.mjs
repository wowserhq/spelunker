import mpq from '../index.mjs';

const file = mpq.files.get('Interface\\GlueXML\\GlueStrings.lua');
const source = file.data.toString();
file.close();

const ENTRY_MATCHER = /([\w]+)\s*=\s*"(.+?)";/g;

const strings = {};

let match = null;
while (match = ENTRY_MATCHER.exec(source)) {
  const [, id, value] = match;
  strings[id] = value;
}

export default strings;
