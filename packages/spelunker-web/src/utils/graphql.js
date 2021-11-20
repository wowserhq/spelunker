/* eslint-disable import/prefer-default-export */

const getSelectedFields = field => (field?.selectionSet?.selections ?? [])
  .map(selection => selection.name.value);

export {
  getSelectedFields,
};
