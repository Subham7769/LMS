import React, { useEffect } from 'react';

import UserImage01 from '../../assets/image/user-32-01.jpg';
import UserImage02 from '../../assets/image/user-32-02.jpg';
import UserImage03 from '../../assets/image/user-32-03.jpg';
import UserImage04 from '../../assets/image/user-32-04.jpg';
import UserImage05 from '../../assets/image/user-32-05.jpg';
import UserImage06 from '../../assets/image/user-32-06.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSessionId } from '../../redux/Slices/agenticAiSlice';

// const users = [
//   {
//     id: 1,
//     name: 'Dominik Lamakani',
//     image: UserImage01,
//     badgeCount: 2,
//   },
//   {
//     id: 2,
//     name: 'Tisha Yanchev',
//     image: UserImage02,
//     badgeCount: 4,
//   },
//   {
//     id: 3,
//     name: 'Jerzy Wierzy',
//     image: UserImage03,
//     avatarImage: UserImage03,
//   },
//   {
//     id: 4,
//     name: 'Adrian Przetocki',
//     image: UserImage04,
//     checkIcon: true,
//   },
//   {
//     id: 5,
//     name: 'Simona Lürwer',
//     image: UserImage05,
//     checkIcon: true,
//   },
//   {
//     id: 6,
//     name: 'Mary Roszczewski',
//     image: UserImage06,
//     checkIcon: true,
//   },
// ];

function DirectMessages({ setMsgSidebarOpen }) {
  // Define your color palette
const bgColors = [
  'bg-red-300', 'bg-orange-300', 'bg-amber-300', 'bg-yellow-300', 'bg-lime-300',
  'bg-green-300', 'bg-emerald-300', 'bg-teal-300', 'bg-cyan-300', 'bg-blue-300',
  'bg-indigo-300', 'bg-violet-300', 'bg-purple-300', 'bg-pink-300', 'bg-rose-300',
];

// Hash function to convert session ID into a consistent index
const getColorClass = (sessionId) => {
  const hash = [...sessionId].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return bgColors[hash % bgColors.length];
};

  const { selectedSessionId, AllSessionChats, searchSessionTerm } = useSelector((state) => state.agenticAi)
  const [Sessions, setSessions] = React.useState([]);
  const dispatch = useDispatch();

  console.log(Sessions)

useEffect(() => {
  const allSessionList = Object.keys(AllSessionChats).map((sessionId) => ({
    id: sessionId,
  }));

  if (searchSessionTerm) {
    const filteredSessions = allSessionList.filter((session) =>
      session.id.toLowerCase().includes(searchSessionTerm.toLowerCase())
    );
    setSessions(filteredSessions);
  } else {
    setSessions(allSessionList);
  }
}, [searchSessionTerm, AllSessionChats]);



  return (
    <div className="mt-4">
      <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-3">
        Direct messages
      </div>
      <ul className="mb-6">
        {Sessions.map((Session) => (
          <li key={Session.id} className="-mx-2" >
            <button
              className={`flex items-center justify-between w-full p-2 rounded-lg transition ${selectedSessionId === Session.id
                ? 'bg-indigo-500/[0.12] dark:bg-indigo-500/[0.34] to-indigo-500/[0.04]'
                : 'rounded-sm'
                }`}
              onClick={() => {
                dispatch(setSelectedSessionId(Session.id));
                setMsgSidebarOpen(false);
              }}
            >
              <div className="flex items-center truncate">
                {/* <img
                  className="w-8 h-8 rounded-full mr-2"
                  src={Session.image}
                  width="32"
                  height="32"
                  alt={Session.name}
                /> */}
                <div className={`w-8 h-8 rounded-full mr-2 ${getColorClass(Session.id)} text-center dark:text-gray-100`}>...</div>
                <div className="truncate">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {Session.id}
                  </span>
                </div>
              </div>
              <div className="flex items-center ml-2">
                {/* {Session.badgeCount && (
                /> */}
              </div>
              <div className="flex items-center ml-2">
                {/* {Session.badgeCount && (
                  <div className="text-xs inline-flex font-medium bg-violet-400 text-white rounded-full text-center leading-5 px-2">
                    {Session.badgeCount}
                  </div>
                )} */}
                {/* {Session.avatarImage && (
                  <img
                    className="rounded-full shrink-0"
                    src={Session.avatarImage}
                    width="20"
                    height="20"
                    alt={Session.name}
                  />
                )} */}
                {/* {Session.checkIcon && (
                  <svg
                    className="w-3 h-3 shrink-0 fill-current text-gray-400"
                    viewBox="0 0 12 12"
                  >
                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                  </svg>
                )} */}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DirectMessages;
