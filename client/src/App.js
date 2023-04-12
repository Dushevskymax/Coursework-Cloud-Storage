import React, { useEffect, useState } from 'react';
import './styles/App.css';
import WorkSpace from './componets/WorkSpace/WorkSpace';
import changeStyleForAppItem from './utils/changeStyleForAppItem';

function App() {

  const [theme, setTheme] = useState(true);

  useEffect(() =>{
    changeStyleForAppItem.changeCurrentTheme(theme);
  },[theme])

  return (
    <div>
      <WorkSpace theme={theme} changeTheme={setTheme}/>
    </div>
  );
}

export default App;
