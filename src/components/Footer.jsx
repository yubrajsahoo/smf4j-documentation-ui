import React from 'react';
import {URLS} from '../constants/urls';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 py-8 bg-white">
            <div
                className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
                <p>&copy; {currentYear} Yubraj Sahoo. All rights reserved.</p>
                <div className="mt-4 sm:mt-0 space-x-6">
                    <a href={URLS.GITHUB_PROJECT} target="_blank" rel="noreferrer"
                       className="hover:text-indigo-600 transition-colors">
                        GitHub
                    </a>
                    <a href={URLS.GITHUB_AUTHOR} target="_blank" rel="noreferrer"
                       className="hover:text-indigo-600 transition-colors">
                        Author
                    </a>
                    <a href={URLS.PORTFOLIO} target="_blank" rel="noreferrer"
                       className="hover:text-indigo-600 transition-colors">
                        Portfolio
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
