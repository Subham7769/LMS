import React from 'react';
import UploadOptions from './UploadOptions';

function MessagesFooter({ showUploader, setShowUploader }) {
  return (
    <div className="sticky bottom-0 bg-white backdrop-blur-3xl dark:bg-[#151D2C]/90 border-t border-gray-200 dark:border-gray-700/60 px-1 sm:px-6 md:px-5 z-10">
      {/* Upload Options */}
      {showUploader && (
        <UploadOptions showUploader={showUploader} setShowUploader={setShowUploader} />
      )}

      {/* Chat Input */}
      <form 
        className="flex items-end justify-between gap-3 py-4 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Plus Button */}
        <button
          type="button"
          className="mb-2 shrink-0 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
          onClick={(e) => {
            e.stopPropagation();
            setShowUploader((prev) => !prev);
          }}
        >
          <span className="sr-only">Add</span>
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.98 5.38 18.62.02 12 0zm6 13h-5v5h-2v-5H6v-2h5V6h2v5h5v2z" />
          </svg>
        </button>

        {/* Message Input */}
        <div className="flex-grow flex items-end">
          <label htmlFor="message-input" className="sr-only">Type a message</label>
          <textarea
            id="message-input"
            placeholder="Aa"
            rows={1}
            className="w-full bg-gray-100 dark:bg-gray-800 border-transparent dark:border-transparent focus:bg-white focus:border-gray-300 dark:focus:bg-gray-800 placeholder-gray-500 resize-none overflow-y-auto rounded-md px-3 py-2 leading-snug max-h-[7.5rem] scrollbar-hide transition-all duration-300"
            onChange={(e) => {
              const el = e.target;
              el.style.height = 'auto';
              const maxHeight = 5 * 1.5 * 16; // 5 lines
              el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
            }}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white whitespace-nowrap"
        >
          Send -&gt;
        </button>
      </form>
    </div>
  );
}

export default MessagesFooter;
