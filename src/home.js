import React, { useState } from 'react';
import Sidebar from './component/sidebar';
import Header from './component/header';


const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
     <div className="flex flex-col h-screen">
    <Header toggleSidebar={toggleSidebar} />
  <div className="flex h-full">
    {isSidebarVisible && <Sidebar />}
       
    </div>
   </div>
   
  );
};

export default App;