"use client";

import Script from "next/script";

const NewRelic = () => {
    return (
        <Script
            id="new-relic-script"
            strategy="afterInteractive"
            src="/script/newrelic.js"
        />
    );
};

export default NewRelic;
