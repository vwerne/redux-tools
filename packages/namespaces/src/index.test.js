import { getNamespaceByAction, isActionFromNamespace } from './';

const fooAction = { meta: { namespace: 'foo' } };
const barAction = { meta: { namespace: 'bar' } };

describe('getNamespaceByAction', () => {
	it('returns the namespace of an action', () => {
		expect(getNamespaceByAction(fooAction)).toBe('foo');
	});

	it('returns undefined if action does not have meta', () => {
		expect(getNamespaceByAction({})).toBeUndefined();
	});
});

describe('isActionFromNamespace', () => {
	it('returns true when action is global and reducer is global', () => {
		expect(isActionFromNamespace(undefined, {})).toBe(true);
	});

	it('returns true when action is global and reducer is namespaced', () => {
		expect(isActionFromNamespace('foo', {})).toBe(true);
	});

	it('returns true when action is namespaced and reducer is global', () => {
		expect(isActionFromNamespace(undefined, fooAction)).toBe(true);
	});

	it('returns true when namespaces match', () => {
		expect(isActionFromNamespace('foo', fooAction)).toBe(true);
	});

	it('returns false when namespaces do not match', () => {
		expect(isActionFromNamespace('foo', barAction)).toBe(false);
	});
});
