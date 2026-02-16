import React from 'react';
import { APP_NAME } from '../utils/constants';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t py-6 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-600 italic">
                    &copy; {currentYear} {APP_NAME}. All rights reserved.
                </p>
                <div className="mt-2 flex justify-center space-x-4 text-sm text-gray-500">
                    <span>Built with ❤️ by Krish</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
