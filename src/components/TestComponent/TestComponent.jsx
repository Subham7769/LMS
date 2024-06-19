import React, { useState } from 'react'

const TestComponent = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <div className="bg-indigo-600 h-6 w-6 rounded-full p-1" onClick={() => setOpen(!open)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-white transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </div>
        </div>
    )
}

export default TestComponent    