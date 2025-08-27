import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import { AuthContextProvider } from './AuthContext';
import Home from './Pages/Home';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';
import Help from './Pages/Help';
import NoMatch from './Components/NoMatch';
import * as Constants from './Constants';

const App = () => {

  // the parentState will be set by its child slider component
  const [parentState, setParentState] = useState(0);

  // make wrapper function to give child
  const wrapperSetParentState = useCallback(val => {
    setParentState(val);
  }, [setParentState]);

  return (
    <AuthContextProvider authenticated={Constants.USER_TYPE_UNAUTHENTICATED} name={"fred"} email={""}>
      <NavBar
        parentState={parentState} 
        setParentState = {wrapperSetParentState} 
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About state={parentState} />} />
        <Route path="/contact_us" element={<ContactUs state={parentState} />} />
        <Route path="/help" element={<Help state={parentState} />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
