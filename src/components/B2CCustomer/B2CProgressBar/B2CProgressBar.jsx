const B2CProgressBar = ({ SetSubStep, SubStep, Steps }) => {

    return (
        <div className="px-4 pt-12 pb-8">
            <div className="max-w-md mx-auto w-full">
                <div className="relative">
                    <div className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-gray-200 dark:bg-gray-700/60" aria-hidden="true"></div>
                    <ul className="relative flex justify-between w-full">
                        {[...Steps].map((step, index) => (
                            <li key={index} onClick={() => SetSubStep && SetSubStep(index)}>
                                <div
                                    className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold transition  ${SubStep === step
                                        ? "bg-blue-500 text-white"
                                        : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400"
                                        }`}
                                >
                                    {step + 1}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default B2CProgressBar