import { generateEnumDefinition } from '../../../graphql/utils.mjs';
import * as types from '../../../entities/GameObjectType.mjs';

export default generateEnumDefinition('GameObjectType', types);
