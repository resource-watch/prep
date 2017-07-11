import { createSelector } from 'reselect';

const partners = state => state.partners.partners.list;
const filters = state => state.partners.partners.filters;

/**
 * Return the partners that comply with the filters
 * @param {object[]} partners Datasets to filter
 * @param {{ key: string, value: string|number }[]} filters Filters to apply to the partners
 */
const getFilteredPartners = (partners, filters) => { // eslint-disable-line no-shadow
  if (!filters.length) return partners;

  return partners.filter((partner) => { // eslint-disable-line arrow-body-style
    return filters.every((filter) => {
      if (filter.key === 'id') return partner.id === filter.value;
      if (!partner.attributes[filter.key]) return false;

      if (typeof filter.value === 'string') {
        return partner.attributes[filter.key].toLowerCase().match(filter.value.toLowerCase());
      }

      return partner.attributes[filter.key] === filter.value;
    });
  });
};

export default createSelector(partners, filters, getFilteredPartners);
