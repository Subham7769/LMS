import React from 'react';

import User01 from '../../assets/image/user-40-11.jpg';
import User02 from '../../assets/image/user-40-12.jpg';
import ChatImage from '../../assets/image/chat-image.jpg';
import Bot from '../../assets/image/Floating_Robot.jpg';
import PdfIcon from '../../assets/image/pdf_Icon.png';
import DocIcon from '../../assets/image/doc_Icon.png';
import { useSelector } from 'react-redux';


function MessagesBody() {

  // 1. Icon mapping
  const iconMapping = {
    PdfIcon: PdfIcon,
    DocIcon: DocIcon,
  };

  // 2. Avatar mapping
  const avatarMapping = {
    User01: User01,
    Bot: Bot,
  };
  const { chatMessages } = useSelector((state) => state.agenticAi);

  // System Default
  const TypingDots = ({ color }) => (
    <svg
      className={`fill-current text-${color}-400 dark:text-white`}
      viewBox="0 0 20 6"
      width="40"
      height="12"
    >
      <circle cx="3" cy="3" r="1.5">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1s" />
      </circle>
      <circle cx="10" cy="3" r="1.5">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2s" />
      </circle>
      <circle cx="17" cy="3" r="1.5">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3s" />
      </circle>
    </svg>
  );

  const DateSeparator = ({ content }) => {
    return (
      <div className="flex justify-center">
        <div className="inline-flex items-center justify-center text-xs text-gray-600 dark:text-gray-400 font-medium px-2.5 py-1 bg-white dark:bg-gray-700 shadow-xs rounded-full my-5">
          {content}
        </div>
      </div>
    );
  };


  // User Bubbles
  const UserTextBubble = ({ message, timestamp, avatar, failed, onRetry = false }) => {
    const AvatarImg = avatar ? avatarMapping[avatar] : null;

    return (
      <div className="flex justify-end items-start mb-4 last:mb-0">
        <div>
          <div >
            <div className="text-sm bg-gray-200  text-gray-800 dark:bg-gray-500 dark:text-gray-100 p-3 rounded-lg rounded-tr-none mb-1 whitespace-pre-line">
              {message}
            </div>

            {/* Failed status + retry */}
            {failed && (
              <div className="flex items-center justify-end mt-1 space-x-2">
                <div className="text-xs text-red-500 font-medium">Failed to send</div>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Retry
                  </button>
                )}
                <svg
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  title="Message failed"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                </svg>
              </div>
            )}
          </div>

          {!failed && (
            <div className="flex justify-end items-center">
              <div className="text-xs text-gray-500 font-medium">{timestamp}</div>
            </div>
          )}
        </div>

        {AvatarImg && (
          <img className="rounded-full ml-4" src={AvatarImg} width="40" height="40" alt="User Avatar" />
        )}
      </div>
    );
  };


  const UserImageBubble = ({ imageSrc, downloadable, uploading, failed, timestamp, avatar, fileUrl, onRetry }) => {
    const AvatarImg = avatar ? avatarMapping[avatar] : null;
    const Image = imageSrc ? imageSrc : ChatImage;

    return (
      <div className="flex justify-end items-start mb-4 last:mb-0">
        <div>
          <div className="flex items-center">
            {/* Left icon: Uploading / Failed / Download */}
            {uploading ? (
              <svg
                className="animate-spin h-5 w-5 mr-4 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : failed ? (
              <button
                onClick={onRetry}
                className="p-1.5 mr-4 text-red-500 hover:bg-white dark:hover:bg-gray-800 rounded-full border border-red-300 dark:border-red-700 transition"
                title="Upload failed - click to retry"
              >
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                </svg>
              </button>
            ) : downloadable ? (
              <a
                href={fileUrl}
                download
                className="p-1.5 rounded-full border border-gray-200 dark:border-gray-700/60 mr-4 hover:bg-white dark:hover:bg-gray-800 transition"
                title="Download"
              >
                <svg
                  className="w-4 h-4 fill-current text-gray-500 dark:text-gray-400"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 15H1a1 1 0 01-1-1V2a1 1 0 011-1h4v2H2v10h12V3h-3V1h4a1 1 0 011 1v12a1 1 0 01-1 1zM9 7h3l-4 4-4-4h3V1h2v6z" />
                </svg>
              </a>
            ) : null}

            {/* Image Content */}
            <img className="rounded-lg shadow-xs mb-1" src={Image} width="240" height="180" alt="Chat Content" />
          </div>

          {/* Timestamp or upload status */}
          <div className="flex justify-end items-center">
            <div className={`text-xs font-medium ${failed ? "text-red-500" : "text-gray-500"}`}>
              {uploading ? 'Uploading…' : failed ? 'Failed to upload' : timestamp}
            </div>
          </div>
        </div>

        {/* Avatar */}
        {AvatarImg && (
          <img className="rounded-full ml-4" src={AvatarImg} width="40" height="40" alt="User Avatar" />
        )}
      </div>
    );
  };


  const UserTypingBubble = ({ avatar }) => {
    const AvatarImg = avatarMapping[avatar] || null;

    return (
      <div className="flex justify-end items-start mb-4 last:mb-0">
        <div>
          <div className="text-sm bg-gray-200 dark:bg-gray-500 text-gray-800 dark:text-gray-100 p-3 rounded-lg rounded-tr-none mb-1">
            <TypingDots color="gray" />
          </div>
        </div>
        {AvatarImg && (
          <img className="rounded-full ml-4" src={AvatarImg} width="40" height="40" alt="User Avatar" />
        )}
      </div>
    );
  };


  const UserDocumentBubble = ({ fileName, fileUrl, icon, downloadable, uploading, failed, timestamp, avatar }) => {
    const AvatarImg = avatar ? avatarMapping[avatar] : null;
    const IconAsset = icon ? iconMapping[icon] : null;

    return (
      <div className="flex justify-end items-start mb-4 last:mb-0">
        <div>
          <div className='flex items-center'>

            {/* Left icon */}
            {uploading ? (
              <svg
                className="animate-spin h-5 w-5 mr-4 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : failed ? (
              <div className="p-1.5 mr-4 text-red-500 hover:bg-white dark:hover:bg-gray-800 rounded-full border border-red-300 dark:border-red-700 transition" title="Upload failed - retry">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                </svg>
              </div>
            ) : downloadable ? (
              <a
                href={fileUrl}
                download
                className="p-1.5 rounded-full border border-gray-200 dark:border-gray-700/60 mr-4 hover:bg-white dark:hover:bg-gray-800 transition"
                title="Download"
              >
                <svg
                  className="w-4 h-4 fill-current text-gray-500 dark:text-gray-400"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 15H1a1 1 0 01-1-1V2a1 1 0 011-1h4v2H2v10h12V3h-3V1h4a1 1 0 011 1v12a1 1 0 01-1 1zM9 7h3l-4 4-4-4h3V1h2v6z" />
                </svg>
              </a>
            ) : null}

            {/* Document block */}
            <div className="flex items-center bg-gray-200 dark:bg-gray-500 text-gray-800 dark:text-gray-100 p-3 rounded-lg rounded-tr-none mb-1 hover:shadow-lg transition">
              {IconAsset &&
                (typeof IconAsset === "string" ? (
                  <img src={IconAsset} alt="Doc Icon" className="w-6 h-6 mr-2" />
                ) : (
                  <IconAsset className="w-6 h-6 mr-2" />
                ))}
              <span className="text-sm font-medium mr-2 truncate">{fileName}</span>
            </div>
          </div>

          {/* Upload status or timestamp */}
          <div className="flex justify-end items-center">
            <div className={`text-xs font-medium ${failed ? "text-red-500" : "text-gray-500"}`}>
              {uploading ? "Uploading…" : failed ? "Failed to upload" : timestamp}
            </div>
          </div>
        </div>

        {/* Avatar */}
        {AvatarImg && (
          <img className="rounded-full ml-4" src={AvatarImg} width="40" height="40" alt="User Avatar" />
        )}
      </div>
    );
  };

  // Bot Bubbles

  const BotTextBubble = ({ message, timestamp, avatar }) => {
    const AvatarImg = avatar ? avatarMapping[avatar] : null;

    return (
      <div className="flex items-start mb-4 last:mb-0">
        <img className="rounded-full mr-4" src={AvatarImg} width="40" height="40" alt="Bot Avatar" />
        <div>
          <div className="text-sm bg-violet-500 text-white p-3 rounded-lg rounded-tl-none border border-transparent mb-1 whitespace-pre-line">
            {message}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-300 font-medium">{timestamp}</div>
            {/* {statusIcon === 'double-check-green' && (
              <svg className="w-5 h-3 text-green-500 fill-current" viewBox="0 0 20 12">
                <path d="M10.402 6.988l1.586 1.586L18.28 2.28a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0L8.988 8.402l-2.293 2.293a1 1 0 01-1.414 0l-3-3A1 1 0 013.695 6.28l2.293 2.293L12.28 2.28a1 1 0 011.414 1.414l-3.293 3.293z" />
              </svg>
            )}
            {statusIcon === 'single-check-gray' && (
              <svg className="w-3 h-3 text-gray-400 fill-current" viewBox="0 0 12 12">
                <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
              </svg>
            )} */}
          </div>
        </div>
      </div>
    )
  }

  const BotTypingBubble = ({ avatar }) => {
    const AvatarImg = avatarMapping[avatar] || null;

    return (
      <div className="flex items-start mb-4 last:mb-0">
        {AvatarImg && (
          <img className="rounded-full mr-4" src={AvatarImg} width="40" height="40" alt="Bot Avatar" />
        )}
        <div>
          <div className="text-sm bg-violet-500 text-white p-3 rounded-lg rounded-tl-none mb-1">
            <TypingDots color="white" />
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="grow px-4 sm:px-6 md:px-5 py-6">
      {chatMessages.map((msg) => {
        switch (msg.type) {
          case 'userText':
            return <UserTextBubble key={msg.id} {...msg} />;
          case 'botText':
            return <BotTextBubble key={msg.id} {...msg} />;
          case 'image':
            return <UserImageBubble key={msg.id} {...msg} />;
          case 'userTyping':
            return <UserTypingBubble key={msg.id} {...msg} />;
          case 'botTyping':
            return <BotTypingBubble key={msg.id} {...msg} />;
          case 'date-separator':
            return <DateSeparator key={msg.id} {...msg} />;
          case 'document':
            return <UserDocumentBubble key={msg.id} {...msg} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

export default MessagesBody;
