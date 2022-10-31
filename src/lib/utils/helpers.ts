import * as R from 'ramda';

export const isNilOrEmpty = R.anyPass([R.isNil, R.isEmpty]);
export const isPresent = R.complement(isNilOrEmpty);
export const wait = (ms: number) =>
	new Promise((resolve) => {
		setTimeout(() => resolve('Resolved'), ms);
	});
