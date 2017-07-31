import { createSelector } from 'reselect';

const insights = state => state.insights.insights.list;
const filters = state => state.insights.insights.filters;

/**
 * Return the insights that comply with the filters
 * @param {object[]} insights Datasets to filter
 * @param {{ key: string, value: string|number }[]} filters Filters to apply to the insights
 */
const getFilteredInsights = (insights, filters) => { // eslint-disable-line no-shadow
  if (!filters.length) return insights;

  return insights.filter((insight) => { // eslint-disable-line arrow-body-style
    return filters.every((filter) => {
      if (filter.key === 'id') return insight.id === filter.value;
      if (!insight[filter.key]) return false;

      if (typeof filter.value === 'string') {
        return insight[filter.key].toLowerCase().match(filter.value.toLowerCase());
      }

      return insight[filter.key] === filter.value;
    });
  });
};

export default createSelector(insights, filters, getFilteredInsights);
