import { createSelector } from 'reselect';

export const entriesSelector = state => state.entries;

export const totalSelector = createSelector(
  entriesSelector,
  entries => entries.reduce((acc, entry) => acc + entry.amount, 0)
);
