import React from 'react';
import Enzyme, { mount, render } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import CommentList from './CommentList';
import reducer from '../../reducers/rootReducer';


Enzyme.configure({
    adapter: new EnzymeAdapter(),
});


describe('Comment List', () => {
    const mockStore = createStore(reducer, { comments: 0 });
    const getWrapper = () => mount(
        <Provider store={mockStore}>
            <CommentList />
        </Provider>
    );

    it('test button', () => {
        const wrapper = getWrapper();
        expect(wrapper.find('button').text()).toEqual('Add Comment');
    });




});