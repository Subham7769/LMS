import React, { useState, useEffect, useRef } from 'react';

import MessagesSidebar from './MessagesSidebar';
import MessagesHeader from './MessagesHeader';
import MessagesBody from './MessagesBody';
import MessagesFooter from './MessagesFooter';

function Messages() {

  const contentArea = useRef(null)

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [msgSidebarOpen, setMsgSidebarOpen] = useState(true);
  const [showUploader, setShowUploader] = useState(false);


  useEffect(() => {
    contentArea.current.scrollTop = msgSidebarOpen ? 0 : 99999999;
  }, [msgSidebarOpen]); // automatically scroll the chat and make the most recent message visible

  return (
    <div 
    className="flex h-[calc(95dvh-24px)] md:h-[calc(90vh-24px)] overflow-hidden "
    onClick={(e) => {
    e.stopPropagation(); 
    setShowUploader(false);
  }}
    >
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden" ref={contentArea}>
        <main className="grow" >
          <div className="relative flex h-full">
            {/* Messages sidebar */}
            <MessagesSidebar msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />

            {/* Messages body */}
            <div
              className={`grow bg-gray-50 dark:bg-gray-800 flex  flex-col md:translate-x-0 transition-transform duration-300 ease-in-out ${
                false ? 'translate-x-1/3' : 'translate-x-0'
              }`}
            >
              <MessagesHeader msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />
              <MessagesBody />
              <MessagesFooter showUploader={showUploader} setShowUploader={setShowUploader} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Messages;