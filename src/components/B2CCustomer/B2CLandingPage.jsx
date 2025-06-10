import React, { useState } from 'react';
import './css/vendors/aos.css';
import './css/vendors/swiper-bundle.min.css';
import './style.css';
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';

import heroImage from './images/hero-image.png';
import heroIllustration from './images/hero-illustration.svg';
import cardsIllustration from './images/cards-illustration.svg';
import logosIllustration from './images/logos-illustration.svg';
import footerIllustration from './images/footer-illustration.svg';
import features02 from './images/features-02.png';
import features03 from './images/features-03.png';
import features04 from './images/features-04.png';
import logos from './images/logos.png';

import quoteAuthor01 from './images/quote-author-01.jpg';
import quoteAuthor02 from './images/quote-author-02.jpg';

import testimonial01 from './images/testimonial-01.jpg';
import testimonial02 from './images/testimonial-02.jpg';
import testimonialSign01 from './images/testimonial-sign-01.svg';
import testimonialSign02 from './images/testimonial-sign-02.svg';

import pricingImage01 from './images/pricing-01.png';
import pricingImage02 from './images/pricing-02.png';
import pricingImage03 from './images/pricing-03.png';
import pricingImage04 from './images/pricing-04.png';

const pricingPlans = [
    {
        title: "Personal Loans",
        productId: "jdf98g7dfghdfig798d7dfkjdfg89d",
        image: pricingImage01,
        price: "$1,000 - $50,000/m",
        buttonText: "Get Loan",
        description: "Features include",
        features: [
            "Loan terms 12 to 60 months",
            "Fixed interest rates starting at 5.99% APR¹",
            "No collateral required",
            "Simple online application",
            "Quick funding",
            "No prepayment penalties",
        ],
        highlightText: "Single",
    },
    {
        title: "Home Improvement Loans",
        productId: "sd9f8s7df0g8sd7f09gsd7f0g8sd7f",
        image: pricingImage02,
        price: "$5,000 - $100,000/m",
        buttonText: "Get Loan",
        description: "Everything in Starter, plus",
        features: [
            "Loan terms: 12 to 84 months",
            "Competitive rates based on your profile",
            "Fund major renovations or repairs",
            "Fixed monthly payments",
            "No home equity required",
            "Specialized customer support"
        ],
        highlightText: "Popular",
        bgClass: "",
    },
    {
        title: "Debt Consolidation Loans",
        productId: "kjsdf897sdfg879sdf7g98sd7f9g87",
        image: pricingImage03,
        price: "$5,000 - $75,000/m",
        buttonText: "Get Loan",
        description: "Everything in Starter, plus",
        features: [
            "Lower your interest rates",
            "Combine multiple payments into one",
            "Potentially improve credit score",
            "Fixed payoff date",
            "Simple loan management",
            "Financial coaching available"
        ],
        highlightText: "Business",
    },
    {
        title: "Major Purchase Loans",
        productId: "8sd7f6gsd9f8gsdfg7sd8f6g8sd7f6",
        price: "$1,000 - $25,000/m",
        image: pricingImage04,
        alt: "Black",
        buttonText: "Get Loan",
        description: "Everything in You, plus",
        features: [
            "Fund weddings, vacations, or other expenses",
            "Flexible repayment terms",
            "Better rates than most credit cards",
            "Quick application decision",
            "Transparent fee structure",
            "Excellent customer support"
        ],
        highlightText: "All in One",
    },
];

const features = [
    "No application fees",
    "No origination fees",
    "No prepayment penalties",
    "Fixed interest rates",
    "Consistent monthly payments",
    "Fast funding process"
];

const testimonials = [
    {
        id: 1,
        image: testimonial01,
        signImage: testimonialSign01,
        text: `" The fixed monthly payment helped me budget effectively, and I was able to pay off my loan earlier than expected with no penalties. "`,
        name: "Elisa Koeppel",
        role: "Personal Loans Customer",
        signWidth: 150,
        signHeight: 71,
        alt: "Testimonial 01",
    },
    {
        id: 2,
        image: testimonial02,
        signImage: testimonialSign02,
        text: `" The fixed monthly payment helped me budget effectively, and I was able to pay off my loan earlier than expected with no penalties. "`,
        name: "Maria Gress",
        role: "Medical Expenses Customer",
        signWidth: 105,
        signHeight: 61,
        alt: "Testimonial 02",
    },
];

const homeImprovement = [
    "Kitchen Renovations",
    "Bathroom Remodels",
    "Major Repairs",
    "New Appliances",
    "Landscaping",
    "Home Additions"
];

const debtConsolidation = [
    "Credit Card Debt",
    "Medical Bills",
    "High-Interest Loans",
    "Student Loans",
    "Tax Payments",
    "Other Outstanding Debts"
];

const faqs01 = [
    {
        question: "How do I qualify for a personal loan?",
        answer:
            "We consider factors including your credit score, income, employment history, and current debt obligations. You must be at least 18 years old, have a valid ID, and have a regular source of income."
    },
    {
        question: "How quickly can I receive my funds?",
        answer:
            "Most approved applicants receive funds as soon as the next business day after final approval. The exact timing depends on your bank's processing procedures."
    },
    {
        question: "Will checking my rate affect my credit score?",
        answer:
            "No, checking your rate results in a soft credit pull which doesn't impact your credit score. Only when you decide to proceed with the full application will we conduct a hard credit inquiry."
    }
];

const faqs02 = [
    {
        question: "What documents do I need to apply?",
        answer:
            "You'll typically need a government-issued ID, proof of income (pay stubs, tax returns, etc.), and bank account information. We may request additional documentation based on your specific situation."
    },
    {
        question: "Can I pay off my loan early?",
        answer:
            "Yes! We encourage early repayment and charge no prepayment penalties. Paying off your loan early will save you money on interest."
    },
    {
        question: "What if I have less-than-perfect credit?",
        answer:
            "We work with borrowers across various credit profiles. Your rate and approval odds will depend on your overall financial picture, not just your credit score."
    }
];

const loanProducts = [
    "Personal Loans",
    "Debt Consolidation",
    "Home Improvement",
    "Major Purchases",
    "Emergency Expenses",
    "Medical Expenses"
];

const companyLinks = [
    "Company",
    "About Us",
    "How It Works",
    "Responsible Lending",
    "Reviews & Testimonials",
    "Careers",
    "Blog"
];

const resourcesLinks = [
    "Loan Calculator",
    "Credit Resources",
    "Financial Education",
    "Budget Planner",
    "Debt Payoff Calculator",
    "Contact Support"
];

const helpLinks = [
    "Customer Support",
    "FAQ",
    "Privacy Policy",
    "Terms of Service",
    "Account Login",
    "Report Fraud"
];

const B2CLandingPage = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null)

    return (
        <div className="font-aspekta antialiased bg-white text-slate-800 font-[350]">
            {/* Page wrapper */}

            <div className="flex flex-col min-h-screen overflow-hidden">

                {/* Site header */}
                <header className="absolute w-full z-30">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="flex items-center justify-between h-16 md:h-20">

                            {/* Site branding */}
                            <div className="shrink-0 mr-4">
                                {/* Logo */}
                                <a className="block" href="index.html" aria-label="Cruip">
                                    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                                        <g fillRule="nonzero" fill="none">
                                            <g className="fill-blue-50" transform="translate(3 3)">
                                                <circle cx="5" cy="5" r="5" />
                                                <circle cx="19" cy="5" r="5" />
                                                <circle cx="5" cy="19" r="5" />
                                                <circle cx="19" cy="19" r="5" />
                                            </g>
                                            <g className="fill-sky-300">
                                                <circle cx="15" cy="5" r="5" />
                                                <circle cx="25" cy="15" r="5" />
                                                <circle cx="15" cy="25" r="5" />
                                                <circle cx="5" cy="15" r="5" />
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                            </div>

                            {/* Desktop navigation */}
                            <nav className="flex grow">

                                {/* Desktop sign in links */}
                                <ul className="flex grow justify-end flex-wrap items-center">
                                    <li className="ml-3">
                                        <a className="btn-sm inline-flex items-center text-slate-100 bg-slate-800 hover:bg-slate-900 group shadow-xs" onClick={() => navigate("/customer/loan-application")} >
                                            Get your Loan Approved
                                            <span className="tracking-normal text-sky-400 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                                                <svg className="fill-current" width="12" height="10" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z" />
                                                </svg>
                                            </span>
                                        </a>
                                    </li>
                                </ul>

                            </nav>

                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="grow">

                    {/* Hero */}
                    <section className="relative">

                        {/* Bg */}
                        <div className="absolute inset-0 rounded-bl-[100px] mb-28 md:mb-0 bg-linear-to-tr from-blue-600 to-blue-500 pointer-events-none z-0" aria-hidden="true"></div>

                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <div className="pt-36 md:pt-40 md:pb-20">

                                {/* Hero content */}
                                <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left">

                                    {/* Content */}
                                    <div className="md:w-[600px]">

                                        {/* Copy */}
                                        <h1 className="h1 text-white mb-6" data-aos-delay="100">Apply for your personal loan in minutes <br /><span className="relative inline-flex items-center justify-center">
                                            <svg className="absolute " width="246" height="76" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M55.224 10.087c-13.986 3.38-25.552 7.614-33.97 12.438-4.171 2.412-7.508 4.953-9.953 7.58-2.395 2.628-3.807 5.332-4.21 8.058-.266 1.99.075 3.985 1.02 5.955.922 1.973 2.37 3.919 4.327 5.819 7.028 6.749 20.696 12.657 39.108 16.904 18.475 4.28 40.791 6.693 63.89 6.91 20.527.186 40.83-1.353 58.737-4.452 11.396-1.964 21.73-4.463 30.631-7.407 8.905-2.941 16.508-6.232 22.611-9.788 3.663-2.222 4.978-1.73 3.59.491-1.13 1.509-2.83 2.971-5.067 4.357-3.235 1.976-7.254 3.82-11.962 5.49-4.686 1.628-9.745 3.15-15.139 4.553a273.749 273.749 0 0 1-17.309 3.752 339.58 339.58 0 0 1-19.111 2.822c-3.367.35-6.676.738-10.087 1.025-3.412.286-6.868.546-10.339.75-13.955.815-28.266.87-42.283.165-13.996-.735-27.452-2.236-39.729-4.435-14.867-2.672-27.78-6.263-37.927-10.548-10.21-4.343-17.115-9.34-20.204-14.618C.15 43.028-.38 40.095.268 37.176c.295-1.462.868-2.917 1.713-4.357.883-1.432 2.027-2.847 3.427-4.239 2.819-2.783 6.622-5.463 11.342-7.99 4.626-2.528 10.101-4.9 16.335-7.074C48.423 8.116 68.15 4.072 90.24 1.802A371.99 371.99 0 0 1 115.924.135c54.806-1.437 105.87 8.691 124.34 24.662 1.911 1.728 3.392 3.498 4.431 5.295 1.352 2.388 1.655 4.82.901 7.234-.223 1.092-1.189 2.158-2.836 3.127-.493.309-1.076.603-1.742.88-.916.272-1.27-.27-1.344-1.462-.074-1.193 0-3.05-.429-5.409-.722-3.525-3.213-6.994-7.384-10.284-4.32-3.334-10.299-6.44-17.723-9.206-7.488-2.813-16.364-5.247-26.304-7.211-9.952-1.996-20.87-3.493-32.344-4.434-17.147-1.405-35.144-1.505-52.444-.292-8.673.62-17.094 1.537-25.108 2.732-7.997 1.207-15.556 2.672-22.552 4.37l-.162-.05Z" fill="#2DD4BF" fillRule="nonzero" />
                                            </svg>
                                            not days
                                        </span></h1>
                                        <p className="text-lg text-blue-200 mb-8" data-aos-delay="200">Our simple application process works on all devices, so you can apply from anywhere and get funds as
                                            quickly as the next business day.
                                            {/* <br className="hidden md:block" /> have to set it up once, and get beautiful results forever. */}
                                        </p>

                                        {/* Buttons */}
                                        <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-12 md:mb-0" data-aos-delay="300">
                                            <div>
                                                <a className="btn-sm w-full inline-flex items-center text-slate-100 bg-slate-800 hover:bg-slate-900 group shadow-xs" onClick={() => navigate("/customer/loan-application")}>
                                                    Get your Loan Approved
                                                    <span className="tracking-normal text-sky-400 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                                                        <svg className="fill-current" width="12" height="10" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z" />
                                                        </svg>
                                                    </span>
                                                </a>
                                            </div>
                                            <div>
                                                <a className="btn-sm w-full inline-flex items-center text-white bg-linear-to-tr from-blue-400 hover:bg-blue-500 shadow-xs relative before:absolute before:inset-0 " href="support.html">Read documentation</a>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Image */}
                                    <div className="md:absolute md:left-[600px] md:top-0 -mb-12 md:-mt-12 md:mb-0">
                                        <div className="relative -mx-16 md:mx-0">
                                            {/* Background Illustration (behind) */}
                                            <img
                                                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mt-16 md:mt-0 pointer-events-none max-w-none mix-blend-lighten z-0 m-auto"
                                                src={heroIllustration}
                                                width="960"
                                                height="960"
                                                aria-hidden="true"
                                            />

                                            {/* Foreground Image */}
                                            <div className="relative z-10">
                                                <img
                                                    src={heroImage}
                                                    className="md:max-w-none md:rotate-[0deg] max-w-[450px] md:ml-0 ml-12 max-h-[545px] m-auto"
                                                    width="548"
                                                    height="545"
                                                    alt="Features 01"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section #1 */}
                    <section>
                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <div className="py-12 md:py-28 md:pb-20">

                                {/* Items */}
                                <div className="max-w-sm mx-auto grid gap-12 md:grid-cols-3 md:-mx-9 md:gap-0 items-start md:max-w-none">

                                    {/* 1st item */}
                                    <div className="relative md:px-9 after:hidden md:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-16 after:bg-slate-200 last:after:hidden" data-aos-delay="100">
                                        <div className="mb-3">
                                            <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                                                <defs>
                                                    <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="a">
                                                        <stop stopColor="#2563EB" offset="0%" />
                                                        <stop stopColor="#3B82F6" offset="100%" />
                                                    </linearGradient>
                                                </defs>
                                                <g fillRule="nonzero" fill="none">
                                                    <path d="m19.93 36.705-9.769-20.03c-.208-.426.026-.966.523-1.209L39.446 1.438c.497-.242 1.066-.094 1.274.332l9.77 20.03c.207.427-.026.967-.523 1.21L21.205 37.036c-.497.243-1.067.094-1.274-.332Zm2.395-22.466-7.19 3.507.876 1.798 7.19-3.507-.876-1.798Z" fill="#7DD3FC" />
                                                    <path d="M32 46V12h5.143c.474 0 .857.447.857 1v32c0 .553-.383 1-.857 1H32Zm-2 0H14.857c-.474 0-.857-.447-.857-1V13c0-.553.383-1 .857-1H30v34ZM18 34v8h2v-8h-2Z" fill="url(#a)" style={{ mixBlendMode: "multiply" }} transform="rotate(64 19.372 32.782)" />
                                                </g>
                                            </svg>
                                        </div>
                                        <h4 className="text-xl font-bold mb-1">Fast & Simple Application</h4>
                                        <p className="text-slate-500">Complete your loan application in minutes. Our streamlined process requires minimal documentation so
                                            you can focus on what matters most.</p>
                                    </div>

                                    {/* 2nd item */}
                                    <div className="relative md:px-9 after:hidden md:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-16 after:bg-slate-200 last:after:hidden">
                                        <div className="mb-3">
                                            <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                                                <defs>
                                                    <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="a">
                                                        <stop stopColor="#2563EB" offset="0%" />
                                                        <stop stopColor="#3B82F6" offset="100%" />
                                                    </linearGradient>
                                                </defs>
                                                <g fillRule="nonzero" fill="none">
                                                    <path d="M43.443 49.745a1.028 1.028 0 0 1-.262-.019l-23.5-4.9a1 1 0 0 1-.775-1.186l6.2-29.352a1.006 1.006 0 0 1 1.182-.773l23.42 4.885a1 1 0 0 1 .776 1.183l-6.12 29.37a1 1 0 0 1-.921.795v-.003Z" fill="#7DD3FC" />
                                                    <path d="M25 32H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h24a1 1 0 0 1 1 1v30a1 1 0 0 1-1 1ZM8 15.25l3.5 4 6.5-6.5-1-.75-5.5 4.25-2.5-2-1 1Z" fill="url(#a)" style={{ mixBlendMode: "multiply" }} transform="translate(6 6)" />
                                                </g>
                                            </svg>
                                        </div>
                                        <h4 className="text-xl font-bold mb-1">Competitive Rates</h4>
                                        <p className="text-slate-500">Get access to competitive interest rates personalized to your financial profile. Pre-qualify without
                                            affecting your credit score.</p>
                                    </div>


                                    {/* 3rd item */}
                                    <div className="relative md:px-9 after:hidden md:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-16 after:bg-slate-200 last:after:hidden" data-aos-delay="200">
                                        <div className="mb-3">
                                            <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                                                <defs>
                                                    <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="a">
                                                        <stop stopColor="#2563EB" offset="0%" />
                                                        <stop stopColor="#3B82F6" offset="100%" />
                                                    </linearGradient>
                                                </defs>
                                                <g fillRule="nonzero" fill="none">
                                                    <path d="M30.22 38.065h-26a1 1 0 0 1-1-1v-32a1 1 0 0 1 1-1h26a1 1 0 0 1 1 1v32a1 1 0 0 1-1 1Zm-19-24v2h7v-2h-7Zm3 6v2h10v-2h-10Zm-3 6v2h7v-2h-7Z" fill="#7DD3FC" />
                                                    <path d="m51.585 50.536-25.984.907a1 1 0 0 1-1.034-.964l-1.117-31.98a1 1 0 0 1 .965-1.035l25.984-.907a1 1 0 0 1 1.034.964l1.117 31.98a1 1 0 0 1-.965 1.035ZM40.337 38.061l3.832-4.11a.843.843 0 0 0-.042-1.192l-4.11-3.833-1.15 1.235 3.492 3.256-3.257 3.493 1.235 1.15Zm-4.97.173L36.518 37l-3.492-3.257 3.256-3.492-1.234-1.151-3.832 4.11a.843.843 0 0 0 .041 1.192l4.11 3.832Z" fill="url(#a)" style={{ mixBlendMode: "multiply" }} />
                                                </g>
                                            </svg>
                                        </div>
                                        <h4 className="text-xl font-bold mb-1">Quick Funding</h4>
                                        <p className="text-slate-500">Once approved, receive funds directly to your account as soon as the next business day. No waiting
                                            weeks for the money you need.</p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </section>

                    {/* Section #2 */}
                    <section data-aos-id-2>
                        <div className="relative max-w-7xl mx-auto">

                            {/* Bg */}
                            <div className="absolute inset-0 rounded-tr-[100px] mb-24 md:mb-0 bg-slate-800 pointer-events-none " aria-hidden="true"></div>

                            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                                <div className="pt-12 md:py-20">

                                    {/* Section content */}
                                    <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left">

                                        {/* Content */}
                                        <div className="md:max-w-lg">

                                            {/* Copy */}
                                            <h2 className="h2 text-white mb-4" data-aos-anchor="[data-aos-id-2]" data-aos-delay="100">Find the right loan for your personal needs</h2>
                                            <p className="text-lg text-slate-400 mb-8" data-aos-anchor="[data-aos-id-2]" data-aos-delay="200">Whether you're consolidating debt, financing home improvements, or covering unexpected expenses,
                                                our personal loans provide the flexibility you need with terms that work for you.
                                            </p>

                                            {/* Button */}
                                            <div className="max-w-xs mx-auto sm:max-w-none mb-8" data-aos-anchor="[data-aos-id-2]" data-aos-delay="300">
                                                <div>
                                                    <a className="btn-sm inline-flex items-center text-blue-50 bg-blue-500 hover:bg-blue-600 group shadow-xs" onClick={() => navigate("/customer/loan-application")}>
                                                        Get your Loan Approved
                                                        <span className="tracking-normal text-sky-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                                                            <svg className="fill-current" width="12" height="10" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z" />
                                                            </svg>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Quote */}
                                            <div className="flex max-w-md mx-auto md:mx-0 text-left" data-aos-anchor="[data-aos-id-2]" data-aos-delay="300">
                                                <img className="rounded-full self-start shrink-0 mr-3" src={quoteAuthor01} width="32" height="32" alt="Quote author 01" />
                                                <div>
                                                    <blockquote className="text-slate-400 m-0">
                                                        " I was amazed at how easy the process was. I applied in the evening and had my loan funded by the
                                                        next afternoon. The rates were better than my credit card by far ! "
                                                    </blockquote>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Image */}
                                        <div className="md:absolute md:left-[412px] md:top-0 md:-mt-5">
                                            <div className="relative -mx-16 md:mx-0">
                                                {/* Background Illustration (Behind) */}
                                                <img
                                                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mt-16 md:mt-0 pointer-events-none max-w-none mix-blend-lighten z-0"
                                                    src={cardsIllustration}
                                                    width="742"
                                                    height="742"
                                                    aria-hidden="true"
                                                />

                                                {/* Foreground Image (Above) */}
                                                <div data-aos-anchor="[data-aos-id-2]" className="relative z-10 mt-16 md:mt-0">
                                                    <img
                                                        src={features02}
                                                        className="md:max-w-none m-auto max-w-[400px] max-h-[545px] "
                                                        width="775"
                                                        height="450"
                                                        alt="Features 01"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section #3 */}
                    <section className="mt-12 md:mt-20" data-aos-id-3>
                        <div className="relative max-w-7xl mx-auto">

                            {/* Bg */}
                            <div className="absolute inset-0 rounded-tl-[100px] mb-24 md:mb-0 bg-linear-to-b from-slate-100 pointer-events-none " aria-hidden="true"></div>

                            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                                <div className="pb-6 pt-12 md:pt-20">

                                    {/* Section content */}
                                    <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left flex flex-col md:flex-row items-center justify-end">

                                        {/* Content */}
                                        <div className="w-[512px] max-w-full shrink-0 md:order-1">

                                            {/* Copy */}
                                            <h2 className="h2 mb-4" data-aos-anchor="[data-aos-id-3]" data-aos-delay="100">Borrow confidently with transparent terms</h2>
                                            <p className="text-lg text-slate-500 mb-8" data-aos-anchor="[data-aos-id-3]" data-aos-delay="200">Our personal loans come with no hidden fees, no prepayment penalties, and fixed monthly payments.
                                                Know exactly what you'll pay from day one.</p>

                                            {/* Button */}
                                            <div className="max-w-xs mx-auto sm:max-w-none mb-8" data-aos-anchor="[data-aos-id-3]" data-aos-delay="300">
                                                <div>
                                                    <a className="btn-sm inline-flex items-center text-blue-50 bg-blue-500 hover:bg-blue-600 group shadow-xs" onClick={() => navigate("/customer/loan-application")}>
                                                        Get your Loan Approved
                                                        <span className="tracking-normal text-sky-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                                                            <svg className="fill-current" width="12" height="10" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z" />
                                                            </svg>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Quote */}
                                            <div className="flex max-w-md mx-auto md:mx-0 text-left" data-aos-anchor="[data-aos-id-3]" data-aos-delay="300">
                                                <img className="rounded-full self-start shrink-0 mr-3" src={quoteAuthor02} width="32" height="32" alt="Quote author 02" />
                                                <div>
                                                    <blockquote className="text-slate-500 m-0">
                                                        " After comparing several lenders, I chose this one for their transparent fees and excellent customer
                                                        service. The entire process was straightforward and stress-free "
                                                    </blockquote>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Image */}
                                        <div className="w-full max-w-[18rem] md:max-w-none md:mr-8 mt-8 md:mt-0 flex justify-center align-middle">
                                            <div className="relative -mx-8 md:mx-0 ">
                                                <img src={features03} className="md:max-w-none" width="460" height="460" alt="Features 03" data-aos-anchor="[data-aos-id-3]" />
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Section #4 */}
                    <section className="mt-6" data-aos-id-4>
                        <div className="relative max-w-7xl mx-auto">

                            {/* Bg */}
                            <div className="absolute inset-0 rounded-tr-[100px] mb-24 md:mb-0 border-2 border-slate-100 pointer-events-none " aria-hidden="true"></div>
                            <div className="absolute inset-0 rounded-tr-[100px] mb-24 md:mb-0 bg-linear-to-t from-white pointer-events-none " aria-hidden="true"></div>

                            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                                <div className="py-12 md:py-20">

                                    {/* Section content */}
                                    <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left flex flex-col md:flex-row items-center">

                                        {/* Content */}
                                        <div className="w-[512px] max-w-full shrink-0">

                                            {/* Copy */}
                                            <h2 className="h2 mb-4" data-aos-anchor="[data-aos-id-4]" data-aos-delay="100">Get cashback rewards on your favorite brands</h2>
                                            <p className="text-lg text-slate-500 mb-6" data-aos-anchor="[data-aos-id-4]" data-aos-delay="200"> Get quick access to tailored loan offers from trusted lenders. Whether it's personal needs, business growth, or unexpected expenses — you're in control of how you spend your approved funds.</p>

                                            {/* Lists */}
                                            <div className="sm:columns-2 mb-8 space-y-8 sm:space-y-0" data-aos-anchor="[data-aos-id-4]" data-aos-delay="300">
                                                {/* Column #1 */}
                                                <div>
                                                    <h5 className="font-bold mb-5">Home Improvement</h5>
                                                    <ul className="inline-flex flex-col text-slate-500 space-y-2.5">
                                                        {homeImprovement.map((brand, index) => (
                                                            <li className="flex items-center" key={index}>
                                                                <svg className="shrink-0 mr-3" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle className="fill-blue-100" cx="10" cy="10" r="10" />
                                                                    <path className="fill-blue-500" d="M15.335 7.933 14.87 7c-4.025 1.167-6.067 3.733-6.067 3.733l-1.867-1.4-.933.934L8.802 14c2.158-4.025 6.533-6.067 6.533-6.067Z" />
                                                                </svg>
                                                                <span>{brand}</span>
                                                            </li>
                                                        ))}


                                                    </ul>
                                                </div>
                                                {/* Column #2 */}
                                                <div>
                                                    <h5 className="font-bold mb-5">Debt Consolidation</h5>
                                                    <ul className="inline-flex flex-col text-slate-500 space-y-2.5">
                                                        {debtConsolidation.map((brand, index) => (
                                                            <li className="flex items-center" key={index}>
                                                                <svg className="shrink-0 mr-3" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle className="fill-blue-100" cx="10" cy="10" r="10" />
                                                                    <path className="fill-blue-500" d="M15.335 7.933 14.87 7c-4.025 1.167-6.067 3.733-6.067 3.733l-1.867-1.4-.933.934L8.802 14c2.158-4.025 6.533-6.067 6.533-6.067Z" />
                                                                </svg>
                                                                <span>{brand}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Button */}
                                            <div className="max-w-xs mx-auto sm:max-w-none" data-aos-anchor="[data-aos-id-4]" data-aos-delay="300">
                                                <div>
                                                    <a className="btn-sm inline-flex items-center text-blue-50 bg-blue-500 hover:bg-blue-600 group shadow-xs" onClick={() => navigate("/customer/loan-application")}>
                                                        Get your Loan Approved
                                                        <span className="tracking-normal text-sky-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                                                            <svg className="fill-current" width="12" height="10" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z" />
                                                            </svg>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Image */}
                                        <div className="w-full max-w-sm md:max-w-none md:ml-8 mt-8 md:mt-0">
                                            <div className="relative -mx-8 md:mx-0">
                                                <img src={features04} className="md:max-w-none ml-auto" width="496" height="496" alt="Features 04" data-aos-anchor="[data-aos-id-4]" />
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Section #5 */}
                    <section>
                        <div className="relative max-w-7xl mx-auto">

                            {/* Bg */}
                            <div className="absolute inset-0 rounded-tr-[100px] bg-linear-to-tr from-blue-600 to-blue-500 pointer-events-none" aria-hidden="true"></div>

                            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                                <div className="py-12 md:py-20">

                                    {/* Section content */}
                                    <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left">

                                        {/* Section header */}
                                        <div className="md:max-w-3xl mb-12 md:mb-20">
                                            <h2 className="h2 text-white mb-4">Get started in minutes and receive funds quickly</h2>
                                            <p className="text-lg text-blue-200 mb-8">Our simple application takes most people less than 10 minutes to complete, and you'll receive a decision quickly.</p>
                                        </div>

                                        {/* Image */}
                                        <div className="flex justify-center mb-6" data-aos-delay="100">
                                            <div className="relative">
                                                <img className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none max-w-none mix-blend-lighten" src={logosIllustration} width="594" height="639" aria-hidden="true" />
                                                <img src={logos} width="720" height="283" alt="Logos" />
                                            </div>
                                        </div>

                                        {/* Items */}
                                        <div className="max-w-sm mx-auto grid gap-12 md:grid-cols-3 md:-mx-9 md:gap-0 items-start md:max-w-none text-left" data-aos-delay="200">

                                            {/* 1st item */}
                                            <div className="relative md:px-9 after:hidden md:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-16 after:bg-blue-400 last:after:hidden">
                                                <div className="mb-3">
                                                    <div className="flex items-center justify-center font-bold text-teal-600 bg-teal-200 h-11 w-11 rounded-full">1</div>
                                                </div>
                                                <h4 className="text-white text-xl font-bold mb-1">Check your rate</h4>
                                                <p className="text-blue-200">See what rates you qualify for in minutes without affecting your credit score. All you need is some basic information to get started.</p>
                                            </div>

                                            {/* 2nd item */}
                                            <div className="relative md:px-9 after:hidden md:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-16 after:bg-blue-400 last:after:hidden">
                                                <div className="mb-3">
                                                    <div className="flex items-center justify-center font-bold text-teal-600 bg-teal-200 h-11 w-11 rounded-full">2</div>
                                                </div>
                                                <h4 className="text-white text-xl font-bold mb-1">Complete your application</h4>
                                                <p className="text-blue-200">If you like what you see, finish your application by verifying your identity and providing any necessary documentation</p>
                                            </div>

                                            {/* 3rd item */}
                                            <div className="relative md:px-9 after:hidden md:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-16 after:bg-blue-400 last:after:hidden">
                                                <div className="mb-3">
                                                    <div className="flex items-center justify-center font-bold text-teal-600 bg-teal-200 h-11 w-11 rounded-full">3</div>
                                                </div>
                                                <h4 className="text-white text-xl font-bold mb-1">Receive your funds</h4>
                                                <p className="text-blue-200">Once approved, funds are deposited directly into your bank account as soon as the next business day.</p>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Section #6 */}
                    <section className="mt-12 md:mt-20" data-aos-id-6>
                        <div className="relative max-w-7xl mx-auto">

                            {/* Bg */}
                            <div className="absolute inset-0 rounded-tl-[100px] mb-24 md:mb-0 bg-linear-to-b from-slate-100 pointer-events-none " aria-hidden="true"></div>

                            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                                <div className="py-12 md:py-20">

                                    {/* Section content */}
                                    <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left flex flex-col md:flex-row items-center justify-end">

                                        {/* Content */}
                                        <div className="w-[512px] max-w-full shrink-0 md:order-1">

                                            {/* Copy */}
                                            <h2 className="h2 mb-4" data-aos-anchor="[data-aos-id-6]" data-aos-delay="100">Designed with your financial success in mind</h2>
                                            <p className="text-lg text-slate-500 mb-6" data-aos-anchor="[data-aos-id-6]" data-aos-delay="200">Our personal loans offer flexibility and convenience to help you achieve your financial goals.</p>
                                            <ul
                                                className="inline-flex flex-col text-slate-500 space-y-2.5"
                                                data-aos-anchor="[data-aos-id-6]"
                                                data-aos-delay="300"
                                            >
                                                {features.map((text, index) => (
                                                    <li key={index} className="flex items-center">
                                                        <svg className="shrink-0 mr-3" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                                            <circle className="fill-blue-100" cx="10" cy="10" r="10" />
                                                            <path
                                                                className="fill-blue-500"
                                                                d="M15.335 7.933 14.87 7c-4.025 1.167-6.067 3.733-6.067 3.733l-1.867-1.4-.933.934L8.802 14c2.158-4.025 6.533-6.067 6.533-6.067Z"
                                                            />
                                                        </svg>
                                                        <span>{text}</span>
                                                    </li>
                                                ))}
                                            </ul>


                                        </div>

                                        {/* Carousel */}
                                        <div className="w-full max-w-sm md:max-w-none md:mr-8 mt-12 md:mt-0" data-aos-anchor="[data-aos-id-6]">
                                            <div className="relative max-w-sm mx-auto">

                                                <div className="absolute inset-0 mb-10 -mt-14 -mx-14 bg-slate-100 " aria-hidden="true"></div>

                                                {/* Carousel built with Swiper.js [https://swiperjs.com/] */}
                                                {/* * Initialized in src/js/main.js */}
                                                {/* * Custom styles in src/css/additional-styles/theme.scss */}
                                                <div className="testimonial-carousel max-w-sm mx-auto sm:max-w-none">

                                                    <Swiper
                                                        // install Swiper modules
                                                        modules={[Navigation, Pagination, A11y]}
                                                        spaceBetween={10}
                                                        slidesPerView={1}
                                                        navigation
                                                        pagination={{ clickable: true }}
                                                    // scrollbar={{ draggable: true }}
                                                    // onSwiper={(swiper) => console.log(swiper)}
                                                    // onSlideChange={() => console.log('slide change')}
                                                    >
                                                        {testimonials.map((item) => (
                                                            <>
                                                                <SwiperSlide>
                                                                    <div key={item.id} className="swiper-slide flex flex-col h-auto shadow-2xl text-left">
                                                                        <div className="relative after:absolute after:inset-0 after:bg-linear-to-t after:from-slate-700">
                                                                            <img src={item.image} className="md:max-w-none" width="384" height="180" alt={item.alt} />
                                                                        </div>
                                                                        <div className="grow flex flex-col relative bg-linear-to-t from-slate-800 to-slate-700 p-6 pt-14">
                                                                            <img
                                                                                className="absolute bottom-full translate-y-1/2"
                                                                                src={item.signImage}
                                                                                width={item.signWidth}
                                                                                height={item.signHeight}
                                                                                alt={`${item.alt} sign`}
                                                                            />
                                                                            <p className="grow font-medium text-slate-200 mb-4">{item.text}</p>
                                                                            <div className="font-medium text-sm text-slate-500">
                                                                                <span className="text-slate-200">{item.name}</span> - <span className="text-slate-400">{item.role}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </SwiperSlide>
                                                            </>

                                                        ))}
                                                    </Swiper>

                                                </div>

                                                {/* Bullets */}
                                                <div className="mt-4">
                                                    <div className="testimonial-carousel-pagination text-center"></div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Section #7 */}
                    <section>
                        <div className="relative max-w-7xl mx-auto">

                            {/* Bg */}
                            <div className="absolute inset-0 rounded-tr-[100px] mb-24 md:mb-0 border-2 border-slate-100 pointer-events-none " aria-hidden="true"></div>
                            <div className="absolute inset-0 rounded-tr-[100px] mb-24 md:mb-0 bg-linear-to-t from-white pointer-events-none " aria-hidden="true"></div>


                            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                                <div className="py-12 md:py-20">

                                    {/* Section content */}
                                    <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left">

                                        {/* Section header */}
                                        <div className="md:max-w-3xl mb-12 md:mb-20">
                                            <h2 className="h2 mb-4">Find the loan that fits your needs</h2>
                                            <p className="text-lg text-slate-500 mb-8">Choose the loan amount and term that works best for your budget.</p>
                                        </div>

                                        {/* Pricing tables */}
                                        <div className="max-w-sm md:max-w-2xl xl:max-w-none mx-auto grid gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-6 items-start" data-aos-delay="100">
                                            {pricingPlans.map((plan, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => setSelected(plan.productId)}
                                                    className={`relative flex flex-col h-full rounded-br-[100px] py-5 px-6 ${plan.productId === selected && "bg-gradient-to-b from-blue-100 to-blue-50"}`}
                                                >
                                                    {(plan.productId === selected && plan.highlightText) && (
                                                        <div className="absolute top-0 right-0 -translate-y-1/2 mr-6 inline-flex text- text-white bg-teal-500 font-[550] rounded-full px-3 py-px">
                                                            {plan.highlightText}
                                                        </div>
                                                    )}
                                                    <div className="mb-4">
                                                        <div className="text-sm font-bold text-center mb-3">{plan.title}</div>
                                                        <img className="w-full rounded-lg" src={plan.image} width="210" height="124" alt={plan.title} />
                                                    </div>
                                                    <div className="mb-5">
                                                        <div className="text-2xl text-slate-800 font-bold text-center mb-4">{plan.price}</div>
                                                        <a
                                                            className={`btn-sm w-full inline-flex items-center ${plan.productId === selected ? "text-white bg-slate-800 hover:bg-slate-600" : "text-blue-50 bg-blue-500 hover:bg-blue-600"}  shadow-xs`}
                                                            href="#0"
                                                        >
                                                            {plan.buttonText}
                                                        </a>
                                                    </div>
                                                    <div className="text-slate-800 font-medium mb-4">
                                                        {plan.description}
                                                    </div>
                                                    <ul className="text-slate-500 text-left space-y-2">
                                                        {plan.features.map((feature, i) => (
                                                            <li key={i} className="flex items-start text-sm">
                                                                <svg className="w-3 h-3 fill-current text-teal-500 mr-3 mt-1.5 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                                                </svg>
                                                                <span>{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}



                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </section>

                    {/* FAQs */}
                    <section>
                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <div className="pb-12 md:pb-20">

                                {/* Section header */}
                                <div className="pb-12">
                                    <h2 className="h2">FAQs</h2>
                                </div>

                                {/* Columns */}
                                <div className="md:flex md:space-x-12 space-y-8 md:space-y-0">

                                    {/* Column */}
                                    <div className="w-full md:w-1/2 space-y-8">

                                        {faqs01.map((faq, index) => (
                                            <div key={index} className="space-y-2">
                                                <h4 className="text-xl font-bold">{faq.question}</h4>
                                                <p className="text-slate-500">{faq.answer}</p>
                                            </div>
                                        ))}

                                    </div>

                                    {/* Column */}
                                    <div className="w-full md:w-1/2 space-y-8">

                                        {faqs02.map((faq, index) => (
                                            <div key={index} className="space-y-2">
                                                <h4 className="text-xl font-bold">{faq.question}</h4>
                                                <p className="text-slate-500">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="relative bg-slate-800">

                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <div className="py-12 md:py-20">

                                <div className="sm:flex sm:flex-col lg:flex-row justify-between items-center">

                                    {/* CTA content */}
                                    <div className="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left">
                                        <p className="text-xl text-blue-500 font-[550] mb-3">Ready to take the next step?</p>
                                        <h2 className="h2 text-slate-100">Get the funds you need with a personal loan tailored to you</h2>
                                    </div>

                                    {/* Buttons */}
                                    <div className="shrink-0">
                                        <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-12 md:mb-0">
                                            <div>
                                                <a className="btn-sm w-full inline-flex items-center text-blue-50 bg-blue-500 hover:bg-blue-600 group shadow-xs" onClick={() => navigate("/customer/loan-application")}>
                                                    Get your Loan Approved
                                                    <span className="tracking-normal text-sky-400 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                                                        <svg className="fill-current" width="12" height="10" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z" />
                                                        </svg>
                                                    </span>
                                                </a>
                                            </div>
                                            <div>
                                                <a className="btn-sm w-full inline-flex items-center text-white bg-slate-700 hover:bg-slate-800 shadow-xs relative before:absolute before:inset-0" href="#0">Get in touch</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </section>

                </main>

                {/* Site footer */}
                <footer className="relative bg-slate-800">

                    {/* Illustration */}
                    <div className="absolute  bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true">
                        <img className="max-w-none" src={footerIllustration} width="1940" height="381" alt="Footer illustration" />
                    </div>

                    <div className="max-w-6xl mx-auto px-4 sm:px-6">

                        {/* Blocks */}
                        <div className="grid sm:grid-cols-12 lg:grid-cols-10 gap-8 py-8 border-t border-slate-700">

                            {/* 1st block */}
                            <div className="sm:col-span-12 lg:col-span-2 lg:max-w-xs">
                                {/* Logo */}
                                <a className="block" href="index.html" aria-label="Cruip">
                                    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                                        <g fillRule="nonzero" fill="none">
                                            <g className="fill-blue-500" transform="translate(3 3)">
                                                <circle cx="5" cy="5" r="5" />
                                                <circle cx="19" cy="5" r="5" />
                                                <circle cx="5" cy="19" r="5" />
                                                <circle cx="19" cy="19" r="5" />
                                            </g>
                                            <g className="fill-sky-300">
                                                <circle cx="15" cy="5" r="5" />
                                                <circle cx="25" cy="15" r="5" />
                                                <circle cx="15" cy="25" r="5" />
                                                <circle cx="5" cy="15" r="5" />
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                            </div>

                            {/* 2nd block */}
                            <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
                                <h6 className="text-sm text-slate-100 font-bold mb-3">Loan Products</h6>
                                <ul className="text-sm font-[450] space-y-2">
                                    {loanProducts.map((product, index) => (
                                        <li key={index}>
                                            <a
                                                className="text-slate-400 hover:text-blue-500 transition duration-150 ease-in-out"
                                                href="#0"
                                            >
                                                {product}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* 3rd block */}
                            <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
                                <h6 className="text-sm text-slate-100 font-bold mb-3">Company</h6>
                                <ul className="text-sm font-[450] space-y-2">
                                    {companyLinks.map((link, index) => (
                                        <li key={index}>
                                            <a
                                                className="text-slate-400 hover:text-blue-500 transition duration-150 ease-in-out"
                                                href="#0"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* 4th block */}
                            <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
                                <h6 className="text-sm text-slate-100 font-bold mb-3">Resources</h6>
                                <ul className="text-sm font-[450] space-y-2">
                                    {resourcesLinks.map((link, index) => (
                                        <li key={index}>
                                            <a
                                                className="text-slate-400 hover:text-blue-500 transition duration-150 ease-in-out"
                                                href="#0"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* 5th block */}
                            <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
                                <h6 className="text-sm text-slate-100 font-bold mb-3">Help</h6>
                                <ul className="text-sm font-[450] space-y-2">
                                    {helpLinks.map((link, index) => (
                                        <li key={index}>
                                            <a
                                                className="text-slate-400 hover:text-blue-500 transition duration-150 ease-in-out"
                                                href="#0"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Bottom area */}
                        <div className="pb-4 md:pb-8 md:flex ">
                            <div className="text-xs text-slate-500 ">
                                ¹APR ranges from 5.99% to 35.99% based on creditworthiness and other factors. Loan approval and actual
                                APR depend on credit history, income, and other information provided in your application. Not all applicants
                                will be approved. Minimum and maximum loan amounts vary by state
                            </div>

                            <div className="text-xs text-slate-500 "> 
                                All loans are subject to credit approval and verification. Funds are typically deposited via ACH for delivery
                                next business day if approved by 5pm CT Monday-Friday. Availability of funds is subject to processing times
                                from your bank, which are outside our control.
                            </div>
                        </div>

                    </div>
                </footer>
            </div>
        </div>

    );
};

export default B2CLandingPage;
