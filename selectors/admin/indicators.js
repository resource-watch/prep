import { createSelector } from 'reselect';

const indicators = state => state.indicators.indicators.list;
const filters = state => state.indicators.indicators.filters;

/**
 * Return the indicators that comply with the filters
 * @param {object[]} indicators Datasets to filter
 * @param {{ key: string, value: string|number }[]} filters Filters to apply to the indicators
 */
const getFilteredIndicators = (indicators, filters) => { // eslint-disable-line no-shadow
  if (!filters.length) return indicators;

  return indicators.filter((indicator) => { // eslint-disable-line arrow-body-style
    return filters.every((filter) => {
      if (filter.key === 'id') return indicator.id === filter.value;
      if (!indicator[filter.key]) return false;

      if (typeof filter.value === 'string') {
        return indicator[filter.key].toLowerCase().match(filter.value.toLowerCase());
      }

      return indicator[filter.key] === filter.value;
    });
  });
};

export default createSelector(indicators, filters, getFilteredIndicators);
