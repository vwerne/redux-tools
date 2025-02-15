import React from 'react';
import { makeStoreInterface } from '@redux-tools/injectors';
import { noop } from 'ramda-extension';
import { mount } from 'enzyme';

import makeHook from './makeHook';
import Provider from './Provider';

const storeInterface = makeStoreInterface('things');
const useThings = makeHook(storeInterface);

jest.mock('./constants', () => ({ IS_SERVER: false }));

const Test = ({ children }) => {
	children();

	return null;
};

describe('makeHook', () => {
	const store = {
		injectThings: jest.fn(),
		ejectThings: jest.fn(),
		subscribe: jest.fn(),
		getState: jest.fn(),
		dispatch: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('calls proper store methods', () => {
		mount(
			<Provider store={store} namespace="yolo">
				<Test>{() => useThings({ foo: noop })}</Test>
			</Provider>
		);

		expect(store.injectThings).toHaveBeenCalledTimes(1);
		expect(store.injectThings.mock.calls[0][0]).toEqual({ foo: noop }, { namespace: 'yolo' });
	});
});
