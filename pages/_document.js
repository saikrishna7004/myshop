import { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";

export default function Document() {
    return (
        <Html>
            <Head>
                <meta name="description" content="Website made by Sai Krishna Karnati using Next.js, React.js and Strapi" />
                <link rel='manifest' href='/manifest.json' />
                <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"/>
                <meta name="theme-color" content="#000000"/>
                <script dangerouslySetInnerHTML={{__html: "\
                if ('serviceWorker' in navigator) {\
                    window.addEventListener('load', () => {\
                      navigator.serviceWorker.register(location.origin+'/service-worker.js');\
                    });\
                }\
                "}}/>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}