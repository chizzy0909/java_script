import React from 'react';
import { Routes, Route } from "react-router-dom";

import UseStateExample from './components/use-state-example/use-state-example.component';
import UseEffectExample from './components/use-effect-example/use-effect-example.component';
import User from './components/user/user.component';
import Post from './components/post/post.component';
import UseReducer from './components/UseReducerExample/use-reducer.component';

import { UseEffect } from './components/use-effect-example/use-effect.component';
import { UseState1 } from './components/use-state-example/use-state-1.component';
import { UseState2 } from './components/use-state-example/use-state-2.component';
import { UseLayoutEffectExample } from './components/use-layout-effect-example/use-layout-effect-example.component';

import './App.css';

const App = props => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/UseStateExample' element={<UseStateExample />} />
        <Route path='/UseEffectExample' element={<UseEffectExample />} />
        <Route path='/useFetch1' element={<User userId={2} />} />
        <Route path='/useFetch2' element={<Post postId={9} />} />
        <Route path='/UseReducer' element={<UseReducer />} />

        <Route path='/UseEffect' element={<UseEffect />} />
        <Route path='/UseState1' element={<UseState1 />} />
        <Route path='/UseState2' element={<UseState2 />} />
        <Route path='/UseLayoutEffectExample' element={<UseLayoutEffectExample />} />


      </Routes>
    </div>
  );
};

export default App;
