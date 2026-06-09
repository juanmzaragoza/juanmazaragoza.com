// ─── Portfolio Data ──────────────────────────────────────────────────────────
const PAGE_SEO = {
  home: {
    title: "Freelance Software Developer | Juan Manuel Zaragoza",
    description: "Full-stack developer with 10+ years of experience building platforms across fintech, pharma, real estate, and more. PHP, Laravel, JavaScript, React, Node.js, Python, GCP, AWS, Azure."
  },
  portfolio: {
    title: "Check my Freelance Software Developer Portfolio | Juan Manuel Zaragoza",
    description: "Explore my Freelance Software Developer Portfolio, revealing a spectrum of crafted applications and solutions. Gain insights into projects, experience, skills, and accomplishments."
  },
  about: {
    title: "Looking to Hire a Software Developer? Get in Touch Today! | Juan Manuel Zaragoza",
    description: "Looking to Hire a Software Developer? I am a Freelance Software Developer skilled in diverse technologies, including PHP, JavaScript, and Python. Passionate by technology and innovation."
  },
  contact: {
    title: "Contact & Hire a Software Developer | Juan Manuel Zaragoza",
    description: "Contact & hire Juan Manuel Zaragoza, an expert software developer specializing in problem-solving and innovative solutions. Full-stack development, QA automation, data platforms."
  }
};

const PROJECTS = [
  {
    id: "qa-automation-for-laravel",
    title: "Vivetix: QA Automation for Laravel",
    subtitle: "Cypress E2E tests, Pest integration tests, and Superset dashboards — improving stability, performance, and scalability",
    date: "Jan 2025",
    status: "running",
    tags: ["Laravel PHP", "Cypress", "Pest", "Superset", "Docker", "PostgreSQL"],
    hero: "images/whatsapp-image-2024-02-06-at-18.53.16-mjE7KlPB0KTqoJVr.jpeg",
    gallery: [
      "images/whatsapp-image-2024-02-06-at-18.53.29-1024x490-A3Q2VvjvkRfJnvKO.jpeg",
      "images/screencapture-localhost-3124-es-coupons-imv6tmsux8fl-maraton-internacional-42km-ujjv-2025-04-25-09_48_35-m5KMQqGBGwf27483.png",
      "images/screenshot-from-2025-04-25-11-00-07-YX4lgvEMlpSDlg6G.png",
      "images/screenshot-from-2025-04-28-20-32-26-mv0WKOwGKOCBEXxQ.png"
    ],
    body: `
      <p>Vivetix is a growing online ticketing platform with complex needs around scalability, software quality, and real-time analytics. Their tech stack was based on Laravel, but they were heavily reliant on manual processes for functional validation, reporting, and quality control.</p>
      <h2>The Challenge</h2>
      <ul>
        <li>Manual testing became unsustainable as the platform expanded</li>
        <li>Critical flows — event creation, ticketing, check-ins, discount codes — lacked automation</li>
        <li>Business stakeholders lacked visibility into real-time performance data</li>
        <li>Tools like Superset and Cypress weren't fully integrated into their Dockerized architecture</li>
      </ul>
      <h2>QA & Test Automation</h2>
      <p>Designed the <strong>entire testing strategy from scratch</strong> — the application had no existing test coverage. Built a robust suite of <strong>integration tests using PHPUnit and Pest</strong>, ensuring critical endpoints and business logic were consistently validated.</p>
      <p>Implemented <strong>Cypress</strong> for end-to-end testing of key flows: event and session creation, discount code validation, ticket resending via email and WhatsApp, admin actions (coupons, check-ins, access control). Standardized HTML attributes (data-testid, id) to improve selector reliability.</p>
      <h2>Backend Development</h2>
      <p>Refactored critical endpoints to improve testability and scalability. Wrote API tests using Pest for <code>/check</code>, <code>/resend</code>, <code>/me</code>, and <code>/sessions</code>. Implemented fine-grained permission checks for seller, admin, and whitebrand roles.</p>
      <h2>Superset & Business Intelligence</h2>
      <p>Deployed and configured Superset inside Docker. Integrated Google OAuth authentication and token-based secure dashboard embedding. Automated dashboard filtering by <code>seller_id</code> based on the user's session.</p>
      <h2>Infrastructure & DevOps</h2>
      <p>Improved GitHub Actions pipelines for Laravel and Superset deployments. Solved persistent Docker errors and standardized PR templates, internal documentation, and development workflows.</p>
      <h3>Impact</h3>
      <ul>
        <li>Release validation times reduced <strong>from days to minutes</strong></li>
        <li>Fewer bugs in production thanks to automated testing</li>
        <li>Business dashboards enabling actionable insights on ticket sales, session activity, and user behavior</li>
        <li>A more professional development process allowing the platform to scale with confidence</li>
      </ul>
    `
  },
  {
    id: "real-estate-chatbot-development-casa-domo-peru",
    title: "Real Estate Chatbot — Casa Domo Peru",
    subtitle: "Automated client interactions, site visit scheduling, and lead management using Manychat and Google Sheets",
    date: "Jan 2025",
    status: "completed",
    tags: ["JavaScript", "Manychat", "Google Sheets"],
    hero: "images/289168780_102138895885338_9005776411265129643_n-YbNqwpEvKLUwoZJ7.png",
    gallery: [
      "images/chat-example-AR0MavwNe8Hj8wxR.png",
      "images/buenaventura_flow-AwvDwzO0awhlyLPP.png",
      "images/generic_flow-mjEqw3zjB1c94NxL.png",
      "images/valledorado_flow-YX4aE620JDc8LN8o.png",
      "images/client_says_hi_flow-mePbw8yWEVH9qNBz.png"
    ],
    body: `
      <p>For Nicole at <a href="https://www.facebook.com/casadomo.pe" target="_blank">Casa Domo</a> in Peru, I developed a chatbot solution to assist her team in scheduling visits to various real estate projects where they offer land for sale. The entire solution was built using Manychat and Google Sheets.</p>
      <h2>Features</h2>
      <ul>
        <li>Identifies any type of message sent by the customer</li>
        <li>Recognizes when a client wants to know more about a specific project</li>
        <li>Avoids duplicate greetings or repetitive interactions</li>
        <li>Sends predefined messages tailored for each project — consistent and accurate</li>
        <li>Provides generic responses with a friendly, human-like tone</li>
        <li>Uses data stored in a Google Sheet to provide real-time answers</li>
        <li>Helps clients schedule a visit to view the land</li>
        <li>Records both scheduled and unscheduled visits in Google Sheets for follow-ups</li>
      </ul>
      <h2>Outcome</h2>
      <p>Automated a significant portion of the client interaction process, making it easier to manage leads and improve efficiency. The tool empowered the team to engage more effectively with potential buyers while saving valuable time and resources.</p>
    `
  },
  {
    id: "automated-google-my-business-integration-data-for-looker-studio",
    title: "Google My Business → Looker Studio",
    subtitle: "Custom community connector built with Apps Script to automate GMB data integration and dashboard creation for a Barcelona marketing agency",
    date: "Dec 2024",
    status: "completed",
    tags: ["JavaScript", "Apps Script", "Looker Studio", "GMB API"],
    hero: "images/images-YBgeqnP22afQKWn5.png",
    gallery: [
      "images/download-AoPq0pgRj7h4pv2V.png",
      "images/screenshot-from-2024-12-22-12-05-20-YanqWpoOwOi74D8B.png"
    ],
    body: `
      <p>When Marcos from <a href="https://newcondal.com/" target="_blank">New Condal</a> approached me, he had a clear challenge: seamlessly integrating data from multiple Google My Business accounts into his marketing dashboards. As a digital marketing agency in Barcelona, manually connecting and analyzing GMB data for multiple clients was time-consuming and inefficient.</p>
      <h2>Solution</h2>
      <p>I developed a <strong>custom community connector using Apps Script</strong>. This solution bridged the gap between Google My Business accounts and Looker Studio dashboards, enabling Marcos to access key business data effortlessly — reviews, ratings, visibility metrics, and more.</p>
      <p>The connector automated the extraction and organization of essential GMB information, making it readily available for analysis and reporting without any manual effort.</p>
      <h2>Dashboard Design</h2>
      <p>Once the data was flowing seamlessly, I collaborated with Marcos to design <strong>visually engaging and informative dashboards</strong>. These dashboards transformed raw data into meaningful insights, displayed in a way that was both aesthetically pleasing and effective for communicating results to New Condal's clients.</p>
      <h2>Outcome</h2>
      <p>The solution eliminated manual labor in pulling reports, allowed the agency to focus on what truly matters — helping their clients grow — and elevated New Condal's services by giving clients a clearer understanding of their online presence and marketing opportunities.</p>
    `
  },
  {
    id: "wordpress-based-e-commerce-platform",
    title: "WordPress E-Commerce — Amedia Social",
    subtitle: "Resolved critical WooCommerce issues: cart calculation bugs and payment error messaging for a social media services platform",
    date: "Nov 2024",
    status: "completed",
    tags: ["WordPress", "WooCommerce", "JavaScript", "PHP"],
    hero: "images/amediasocial.com-A1aByvrEeKhnGPZV.jpg",
    gallery: [
      "images/screencapture-uptest-amediasocial-checkout-2024-11-27-17_42_58-YNqP5jq5DVulOQJZ.png",
      "images/screenshot-from-2024-11-27-17-51-34-m7V5yJVyV0fqk7O0.png"
    ],
    body: `
      <p><a href="https://amediasocial.com/" target="_blank">Amedia Social</a>, managed by Simbiotic Digital, approached me with two critical issues affecting their WooCommerce-based platform designed to boost social media performance and online reputation.</p>
      <h2>Issue 1 — Cart Calculation Bug</h2>
      <p>Users were experiencing <strong>incorrect total calculations</strong> whenever they selected product variations. After diving into the codebase, I discovered the problem stemmed from a JavaScript script responsible for dynamically calculating cart totals. A recent WooCommerce plugin update had altered the DOM structure of the cart page, leaving the script outdated.</p>
      <p>By analyzing the new DOM structure and rewriting the script accordingly, I restored accurate pricing calculations, ensuring that users could confidently proceed with their purchases.</p>
      <h2>Issue 2 — Payment Error Messaging</h2>
      <p>When customers attempted to pay and the transaction failed, the <strong>error messages were vague and unhelpful</strong>, leading to frustration and abandonment. I implemented a solution using WooCommerce's <code>woocommerce_add_error</code> hook, creating a function to replace default messages with more descriptive, user-friendly explanations.</p>
      <h2>Outcome</h2>
      <p>Accurate cart calculations restored trust in the shopping experience, while clearer error messaging contributed to smoother customer interactions and reduced abandonment on the checkout page.</p>
    `
  },
  {
    id: "real-estate-listing-platform-listing-los-cabos",
    title: "Real Estate Platform — Listing Los Cabos",
    subtitle: "Revitalized a React + Firebase platform: improved design, security, responsiveness, and integrated Stripe subscriptions",
    date: "Apr 2024",
    status: "completed",
    tags: ["React", "Node.js", "Firebase", "Stripe"],
    hero: "images/screenshot-from-2024-09-03-19-03-23-A854J684oRUvPoel.png",
    gallery: [
      "images/screenshot-from-2024-09-03-19-04-31-m7VKnE7qevf3R8D8.png",
      "images/screencapture-listing-mu-vercel-app-2024-09-03-19_24_25-ALpoaBvjoOU3yrZJ.png",
      "images/whatsapp-image-2024-09-03-at-19.25.54-YZ9bJaLezlfGv32w.jpeg"
    ],
    body: `
      <p>My client Julio approached me with an urgent need to overhaul a real estate platform that was initially developed using React for the frontend and Firebase as the database. The platform faced numerous challenges: poor design, usability issues, non-functional core features like listing creation and map integration. Additionally, the client lacked ownership of the source code and the Vercel account where the application was hosted.</p>
      <h2>What Was Done</h2>
      <ol>
        <li><strong>React Code Overhaul:</strong> Developed a service layer to decouple business logic from UI components, improving maintainability.</li>
        <li><strong>Responsive Design:</strong> Made substantial improvements ensuring full responsiveness across all devices.</li>
        <li><strong>Security:</strong> Replaced hardcoded keys and sensitive information with environment variables.</li>
        <li><strong>Backend Control:</strong> Set up a new Vercel environment with the updated frontend and minimal backend — Julio now has exclusive control over the entire system.</li>
        <li><strong>User Authentication:</strong> Integrated a robust authentication system to secure the platform and restrict unauthorized access.</li>
        <li><strong>Stripe Subscriptions:</strong> Developed three distinct subscription plans, each unlocking different features, creating a new revenue stream.</li>
      </ol>
      <h2>Outcome</h2>
      <p>Julio now has a fully functional, secure, and responsive real estate platform under his control. The integration of Stripe for subscription services added a new revenue stream, while improvements in design and usability significantly enhanced the user experience.</p>
    `
  },
  {
    id: "information-connection-and-visualization-platform-datakimia",
    title: "Data Platform — Datakimia",
    subtitle: "Full-stack data platform with Next.js, NestJS, Superset embedded reports, and per-client dynamic filtering",
    date: "Feb 2024",
    status: "running",
    tags: ["Next.js", "NestJS", "Superset", "PostgreSQL", "BigQuery", "Python"],
    hero: "images/datakimia_logo-03-Aq2NWxDVDwhKB1nz.png",
    gallery: [
      "images/screenshot-from-2025-02-16-09-57-54-YanqpWylBzF1WqaB.png",
      "images/screenshot-from-2025-02-16-09-58-57-AzG3pReJZRFyEZ3y.png",
      "images/screenshot-from-2025-02-16-09-59-34-ALp7xVn1oztje0OX.png",
      "images/screenshot-from-2025-02-16-10-00-13-AQED70yLn9F5VkKM.png"
    ],
    body: `
      <p>To meet Datakimia's needs, I developed a platform that seamlessly connects information and provides efficient data visualization, ensuring a smooth user experience and quick report delivery. The stack: Next.js (frontend), NestJS (backend), PostgreSQL, and Superset.</p>
      <h2>Key Features</h2>
      <ul>
        <li><strong>Superset API integration</strong> to embed reports with per-client dynamic filtering</li>
        <li><strong>Redis</strong> implementation for fast data store and enhanced performance</li>
        <li>Frontend hosted on <strong>Vercel</strong> with GitHub Actions for automated deployments</li>
        <li>Superset customizations in both <strong>Python backend and React frontend components</strong></li>
        <li>Role-based <strong>user authentication and authorization</strong> for secure data access</li>
      </ul>
      <h2>Ongoing Development</h2>
      <p>This project remains an ongoing effort, with continuous improvements to ensure scalability and adaptability to Datakimia's long-term growth. Working in parallel on other initiatives, I've demonstrated the ability to effectively manage priorities and deliver results in a complex data-driven environment.</p>
    `
  },
  {
    id: "latin-america-professionals-marketplace",
    title: "Professionals Marketplace — Guruxy",
    subtitle: "Role-based menu system and live streaming integration using Agora for a Latin American freelance marketplace",
    date: "Mar 2024",
    status: "completed",
    tags: ["React", "Node.js", "PostgreSQL", "Agora"],
    hero: "images/1652191275505-YrDXVzGQJ7ueXvWP.jpeg",
    gallery: [
      "images/screenshot-from-2024-03-15-21-02-37-Yyv2VqWng4FG29o0.png"
    ],
    body: `
      <p>My client <a href="https://guruxy.com" target="_blank">Guruxy</a> had two clear needs: improve menu loading with user-role-based customization, and develop a live streaming feature allowing professionals to broadcast their knowledge in real time.</p>
      <h2>Role-Based Menu System</h2>
      <p>Implemented a <strong>user-role-menu structure</strong> that allowed each authenticated user to see only the menus relevant to their profile, improving both UX and security.</p>
      <h2>Live Streaming</h2>
      <p>Integrated <strong>Agora</strong> to manage streaming windows and sessions on the site. Made backend adjustments to ensure proper synchronization of live statuses between professionals and users, enabling seamless real-time knowledge sharing.</p>
      <h2>Outcome</h2>
      <p>Significant improvement in user experience with more relevant menus and smoother navigation. The implementation of live streaming provided a new and exciting way for professionals to connect with their audience in real time.</p>
    `
  },
  {
    id: "spain-crm-development",
    title: "CRM Development — Cloudin & Omnisauto",
    subtitle: "Enhanced and customized two Spanish CRM platforms with Laravel, seamlessly integrated with WordPress via custom API endpoints",
    date: "Feb 2024",
    status: "completed",
    tags: ["Laravel PHP", "JavaScript", "WordPress", "PostgreSQL", "MariaDB"],
    hero: "images/gold-630x630-YZ92NBR6N2HMO46p.jpg",
    gallery: [
      "images/screenshot-from-2024-04-18-12-29-18-mk3Dnz466rt10X8l.png",
      "images/screencapture-crmdev-notiapp-dev-home-2024-04-23-10_20_01-mp8nGvJBj8cqGk8q.png",
      "images/screencapture-crmdev-notiapp-dev-clients-2024-04-23-10_20_33-YKbJw6lVnVIQ46Wk.png",
      "images/screencapture-crmdev-notiapp-dev-tasks-2024-04-23-10_21_12-YNqJVy2z3Lt0oV6a.png",
      "images/screencapture-crmdev-notiapp-dev-invoices-1-2024-04-23-10_28_05-Aq2ByvM829fRBE3J.png",
      "images/screencapture-crmdev-notiapp-dev-app-settings-general-2024-04-23-10_21_41-mP4pvnM683U3N8LL.png",
      "images/screencapture-crmdev-notiapp-dev-app-settings-tasks-statuses-2024-04-23-10_22_15-A1aKLw5VpyFzgLDj.png"
    ],
    body: `
      <p>For <a href="https://cloudin.noticrm.app/" target="_blank">Cloudin</a> and <a href="https://omnisauto.pro/" target="_blank">Omnisauto</a>, my task was to enhance existing CRM functionalities and tailor them to specific client needs using Laravel PHP, JavaScript, and MariaDB.</p>
      <h2>Core Development</h2>
      <p>Modified the core codebase focusing on entity creation, billing processes, and dashboard customization. Leveraging Laravel's ORM capabilities, optimized database queries and improved data retrieval performance for efficient handling of large datasets.</p>
      <h2>WordPress Integration</h2>
      <p>One of the significant challenges involved integrating these CRMs with a WordPress platform to synchronize all data seamlessly. By developing <strong>custom API endpoints and data transfer protocols</strong>, established a robust connection enabling real-time data exchange between the CRM systems and WordPress.</p>
      <h2>Outcome</h2>
      <p>Significant improvement in the functionality and usability of both platforms. Clients benefited from streamlined processes, intuitive interfaces, and enhanced capabilities that empowered them to operate more efficiently in their respective domains.</p>
    `
  },
  {
    id: "wordpress-development-digitalice-su-pyme",
    title: "WordPress — Posada Estela de Barros",
    subtitle: "Full WordPress build for a Spanish hotel: theme customization, multilingual setup, SiteMinder integration, and WhatsApp module",
    date: "Feb 2024",
    status: "completed",
    tags: ["WordPress", "PHP", "SiteMinder", "WPML"],
    hero: "images/digitalice_su_pyme_cover-m2W4gKLb7rTrW9lj.jpeg",
    gallery: [
      "images/screencapture-posadalaesteladebarros-es-2024-04-14-22_54_47-m6LvKNkoNOSr2zWQ.png",
      "images/screencapture-posadalaesteladebarros-es-es-accommodation-habitacion-2-2024-04-14-23_02_59-AMqnrJVJ5OhaVoEw.png",
      "images/screencapture-posadalaesteladebarros-es-es-la-posada-2-2024-04-14-23_03_41-YbNa3WOWJViXzo58.png",
      "images/screencapture-posadalaesteladebarros-es-contacto-2024-04-14-23_15_48-A1aKyOKLPBfb2e8j.png"
    ],
    body: `
      <p>In collaboration with <a href="https://digitalicesupyme.es/" target="_blank">Digitalice su Pyme</a>, I undertook a comprehensive WordPress development project for their client Posada Estela de Barros (<a href="https://posadalaesteladebarros.es/" target="_blank">posadalaesteladebarros.es</a>).</p>
      <h2>What Was Built</h2>
      <ul>
        <li>WordPress installation and configuration from scratch</li>
        <li>Theme customization aligned with the inn's unique ambiance</li>
        <li>WhatsApp and cookie management modules for guest communication</li>
        <li>Multilingual translations for diverse international visitors</li>
        <li>SiteMinder plugin integration for hotel reservation management</li>
        <li>Email templates for consistent, professional guest communication</li>
      </ul>
      <h2>Outcome</h2>
      <p>Delivered a complete, functional, and user-friendly website that surpassed the client's expectations — reflecting the essence of Posada Estela de Barros while providing an exceptional online experience for visitors.</p>
    `
  },
  {
    id: "data-platform-development-rwa-platform",
    title: "RWA Data Platform — Next.js + BigQuery",
    subtitle: "Web application integrating multiple data sources into a BigQuery warehouse with a Python Flask API layer for real-time querying",
    date: "Feb 2024",
    status: "completed",
    tags: ["Next.js", "React", "BigQuery", "Python", "Flask"],
    hero: "images/nd_587846285-m7V5JygpZ6FLDGbj.jpg",
    gallery: [
      "images/screencapture-rwa-insights-vercel-app-coming-soon-2024-04-23-19_57_35-YbNaaOrg03Cqxqbn.png",
      "images/screencapture-rwa-insights-vercel-app-2024-04-23-19_56_10-ALpJJ092Nzce9ynD.png",
      "images/screencapture-rwa-insights-vercel-app-treasuries-2024-04-23-19_56_55-YD0ppyNEOBT3RgjR.png",
      "images/screencapture-rwa-insights-vercel-app-stablecoins-2024-04-23-19_57_10-YleMMDr4MaTeDvzB.png"
    ],
    body: `
      <p>Contributed to the RWA Platform Project over a three-week period, playing a pivotal role in developing a solution based on Next.js. Using detailed Figma mockups as the blueprint, helped design and build a web application that integrates data from various sources into a BigQuery data warehouse.</p>
      <h2>Architecture</h2>
      <p><strong>Python Flask</strong> was used to build an efficient API layer, enabling real-time querying and seamless data integration. This streamlined data access allowed the client to gain actionable insights and improve operational efficiency.</p>
      <h2>Outcome</h2>
      <p>Demonstrated the ability to replicate complex Figma mockups accurately, integrate advanced technologies like BigQuery and Flask, and leverage modern web tools to enhance business intelligence and facilitate data-driven decision-making.</p>
    `
  },
  {
    id: "takeda-covid-vaccine-platform",
    title: "Takeda COVID Vaccine Platform",
    subtitle: "Angular + .NET pharmaceutical reporting platform deployed on Azure — enabling fast, customizable report delivery for the COVID vaccine program",
    date: "Oct 2022",
    status: "completed",
    tags: ["Angular", ".NET", "Azure", "CosmosDB"],
    hero: "images/landing-and-login-640x1470-m6LP9G0X3nujGZDK.png",
    gallery: [
      "images/report-keyevents-A8529G1k71Uzx5Ld.png",
      "images/report-timelinechart-3-A3Qa9GDZP4sVXkby.png",
      "images/report-timelinechart-2-A8529G1kZMhWrql8.png",
      "images/report-competitivelandscape-YZ9aQvOlX4ukaNJv.png",
      "images/data-entry-1-YNqOb3lZq7hMvL2X.png",
      "images/report-news-A0xe9GPgZlH8RjDZ.png"
    ],
    body: `
      <p>The client had specific requirements: a seamless user experience, lightning-fast report delivery, and the adaptability to stay ahead in a dynamic pharmaceutical market. We leveraged Angular and .NET, hosted on Azure.</p>
      <h2>Stack</h2>
      <ul>
        <li><strong>Angular</strong> for an aesthetically pleasing and intuitive frontend interface</li>
        <li><strong>.NET</strong> for rapid development of custom features and flexible business logic</li>
        <li><strong>Microsoft Azure</strong> for optimal performance, scalability, and security</li>
      </ul>
      <h2>Outcome</h2>
      <p>The client experienced a substantial increase in productivity, achieving faster report delivery times than ever before. They also gained the agility to pivot swiftly in response to market changes — a crucial asset in the pharmaceutical landscape.</p>
    `
  },
  {
    id: "veterinarian-software",
    title: "Veterinarian Software — IVEE",
    subtitle: "Two-year collaboration: React scripts integrated into Squarespace via Firebase, followed by a full React platform with dashboards and user management",
    date: "Apr 2022",
    status: "completed",
    tags: ["React", "Node.js", "Firebase", "GCP", "Squarespace"],
    hero: "images/screencapture-ivee-platform-buildout-staging-web-app-login-2023-02-13-12_09_42-AE02nxyP2OcKq0jz.png",
    gallery: [
      "images/screencapture-ivee-platform-buildout-staging-web-app-dashboard-2023-02-13-12_08_05-AR02NzBMP8SBVJ8K.png",
      "images/screencapture-ivee-platform-buildout-staging-web-app-dashboard-tableau-2023-02-13-12_08_59-AMqaEzwlerSMD3NL.png",
      "images/screencapture-ivee-platform-buildout-staging-web-app-admin-2023-02-13-12_09_20-m7V8vjZ56VuLwkDp.png",
      "images/screencapture-pupeeze-telehealth-staging-web-app-2023-02-13-12_35_34-mp83DNoM3DUV368e.png",
      "images/screencapture-ivee-squarespace-public-dashboard-2023-02-13-12_25_02-m7V8vjZ2XVCxnZWb.png"
    ],
    body: `
      <p>Two enriching years collaborating with IVEE, a veterinary technology company, across two major projects.</p>
      <h2>Project 1 — React Scripts + Squarespace</h2>
      <p>Developed multiple React scripts serving distinct functionalities within a Website Builder framework. These bespoke scripts automated file parsing and extracted data from diverse sources. Hosted via Firebase, with seamless integration into Squarespace by embedding minified JavaScript. Firestore and Cloud Storage were used for data persistence.</p>
      <h2>Project 2 — React Platform</h2>
      <p>Created a cutting-edge React-based platform incorporating dashboards and user management functionalities. Bridged the gap between business requirements and technical specifications, and coordinated multidisciplinary teams for efficient execution.</p>
    `
  },
  {
    id: "aws-lambdas-and-react-native-app-for-a-lifestyle-startup",
    title: "AWS Lambdas & React Native — Indigo",
    subtitle: "Lambda functions to consolidate React Native app backend logic, plus performance optimization and team documentation for a lifestyle startup",
    date: "Feb 2022",
    status: "completed",
    tags: ["AWS Lambda", "React Native", "Node.js"],
    hero: "images/screenshot-from-2023-03-23-14-39-26-640x479-Yan6Qg9vPJtoBB3k.png",
    gallery: [],
    body: `
      <p>Indigo was confronted with the complex task of developing a versatile backend capable of managing the intricate business logic of their lifestyle application — nutrition, workout, and meditation — which was previously integrated within their React Native platform.</p>
      <h2>Backend Architecture</h2>
      <p>Crafted a sophisticated backend architecture by implementing a series of <strong>Lambda functions</strong>. These were strategically designed to consolidate and optimize the application logic, resulting in a robust and scalable backend infrastructure. By modularizing the codebase, ensured that Indigo's backend was not only efficient but also highly adaptable to future modifications.</p>
      <h2>Performance & Documentation</h2>
      <p>Provided ongoing support for the React Native app, conducting in-depth performance analyses and implementing targeted enhancements. Organized and documented the web application and development team — establishing clear guidelines, documentation protocols, and communication channels to streamline collaboration.</p>
    `
  },
  {
    id: "crm-erp-software",
    title: "Custom CRM/ERP — Spain",
    subtitle: "React ERP frontend with Java backend, plus a Projects Organization SSO system for centralizing access across multiple applications",
    date: "Nov 2021",
    status: "completed",
    tags: ["React", "Java", "MariaDB", "SSO"],
    hero: "images/1608112191210-1-m2WBn6nwR1f5EXZE.jpeg",
    gallery: [
      "images/image-2021-12-16-07-22-44-210-mk38GrVbrXiza2XV.png",
      "images/screenshot-1-d95D9aVk2QU87RWw.png",
      "images/screenshot-1-1-AoPZbrV9VRT7XQ6k.png"
    ],
    body: `
      <p>Developed two bespoke software solutions for a Spain-based client that revolutionized their business operations.</p>
      <h2>ERP Frontend</h2>
      <p>Built a highly adaptable and user-friendly ERP frontend using <strong>React.js</strong>. The framework allowed creation of a dynamic and responsive user experience, empowering users to interact seamlessly with their data. Integrated with a <strong>robust Java backend</strong> ensuring smooth data flow and efficient execution of business logic.</p>
      <h2>Projects Organization — SSO</h2>
      <p>An ambitious endeavor: a web application centralizing access to multiple applications through a <strong>Single Sign-On (SSO)</strong> solution. Provided comprehensive tracking of resources across various projects. Leveraging <strong>MariaDB</strong> as the database platform, with a Java backend server orchestrating the seamless integration of data and functionalities.</p>
    `
  },
  {
    id: "pharmaceutical-platform-development",
    title: "Pharmaceutical Platform — Atacana Group",
    subtitle: "React platform with Node.js cloud functions for entity management, news aggregation, and user permissions in the pharmaceutical sector",
    date: "Sep 2021",
    status: "completed",
    tags: ["React", "Node.js", "Firebase", "GCP", "MongoDB"],
    hero: "images/screenshot-from-2023-09-15-09-01-42-A852zQ024gCvvJN1.png",
    gallery: [
      "images/1add_client-AMqaEQB8o0UMWEgD.png",
      "images/1listing_clients-A1a1xqn525sE4JQP.png",
      "images/1paginated_and_options-mv05BrnJ8bFL41V4.png",
      "images/2diseases-YNqO7Qa21nf5gXJV.png"
    ],
    body: `
      <p>Initial collaboration with Atacana Group involved enhancing the functionality of their React-based system, complemented by Node.js cloud functions and a MongoDB database.</p>
      <h2>Feature Development</h2>
      <p>Crafted essential features and interfaces for managing core entities: clients, companies, compounds, keywords, and users. As involvement expanded, participated in core platform definition meetings for <strong>news aggregation and segmentation by client base</strong>.</p>
      <h2>Strategic Contribution</h2>
      <p>Presented various proposals and fostered productive debates within the entire team — a collaborative approach that allowed innovative solutions to surface. Contributed to configuring development environments and extended scope to backend development, including user management and permissions.</p>
    `
  },
  {
    id: "vet-scripts-for-scraping-pdf-files",
    title: "Vet PDF Scraping — IVEEE",
    subtitle: "Node.js scripts on GCP to extract medical data from canine patient PDF records, storing results in BigQuery for dashboard visualization",
    date: "Jan 2021",
    status: "completed",
    tags: ["Node.js", "GCP", "Firebase", "BigQuery", "Cloud Functions"],
    hero: "images/allgradientgreen-m2WrkrV4aOFVr0on.png",
    gallery: [],
    body: `
      <p>For IVEEE, a veterinary company dedicated to comprehensive animal care, I developed sophisticated scripts to streamline the extraction of vital medical information from PDF files containing canine patient medical histories.</p>
      <h2>Architecture</h2>
      <ul>
        <li><strong>Google Storage bucket</strong> as the repository for PDFs uploaded by veterinarians</li>
        <li><strong>Cloud Function</strong> automatically triggered upon each file reception</li>
        <li>The function reads and scrapes PDF contents based on the associated scraper for each system format</li>
        <li><strong>Modular design:</strong> new PDF formats accommodated by adding new scraping functions</li>
        <li>Extracted data persisted in <strong>BigQuery</strong> for cross-department analysis</li>
        <li>Interactive dashboards providing veterinarians insights into patient health and treatment history</li>
      </ul>
      <p>The project spanned over a year and exemplified the dedication required to address complex challenges in veterinary healthcare through technology.</p>
    `
  },
  {
    id: "medical-units-attention-platform",
    title: "Medical Attention Platform — Buenos Aires Gov",
    subtitle: "Technical Director for a pharmacy tracking system for the City of Buenos Aires — Angular + Java, agile methodology, end-to-end delivery",
    date: "Dec 2020",
    status: "completed",
    tags: ["Angular", "Java", "MariaDB", "Agile"],
    hero: "images/screencapture-atencionmedicamentos-hml-gcba-gob-ar-home-2020-03-16-11_20_12-A852QEbDxKS9gMgl.png",
    gallery: [
      "images/screencapture-atencionmedicamentos-hml-gcba-gob-ar-solicitud-entrega-nueva-2020-03-16-11_21_12-mP4Pl2yX5QFD0GPz.png",
      "images/screencapture-atencionmedicamentos-hml-gcba-gob-ar-solicitud-entrega-2020-03-16-11_23_59-A852QEb6jvUWDw9M.png",
      "images/screencapture-atencionmedicamentos-hml-gcba-gob-ar-farmacias-2020-03-16-11_26_17-A852QEb632SVEkNa.png",
      "images/screenshot-from-2020-03-16-11-15-46-AQE8PDK3kacZ07P2.png"
    ],
    body: `
      <p>Served as <strong>Technical Director</strong> for a comprehensive tracking system for pharmacies dispensing medicines on behalf of the Government of the City of Buenos Aires, ensuring full traceability of medicine distribution operations.</p>
      <h2>System Objectives</h2>
      <ul>
        <li>Monitor pharmacies dispensing government-subsidized medicines</li>
        <li>Manage subsidies and analyze statistics on most needed medicine types</li>
        <li>Implement preventive measures for supply chain continuity</li>
        <li>Ensure full traceability of all distribution operations</li>
      </ul>
      <h2>Technical Leadership</h2>
      <p>Selected and implemented the technology stack: <strong>Angular</strong> (frontend), <strong>Java</strong> (backend), <strong>MariaDB</strong> (database). Collaborated closely with analysts and the Product Owner to define business rules. Led the team using <strong>agile development methodologies</strong>, ensuring adherence to deadlines while delivering a high-quality product. Instituted robust code delivery practices for independent QA testing.</p>
    `
  },
  {
    id: "performance-evaluation-platform-for-a-public-organization",
    title: "Performance Evaluation Platform — Buenos Aires Gov",
    subtitle: "Technical Lead for a city-wide employee performance evaluation system — Angular, Java Spring Boot, PostgreSQL, with agile methodology",
    date: "Jan 2020",
    status: "completed",
    tags: ["Angular", "Java Spring Boot", "PostgreSQL", "Agile"],
    hero: "images/screenshot-from-2020-03-16-10-49-49-AVL38g00L2iExlwM.png",
    gallery: [
      "images/screencapture-evaluacion-qa-gcba-gob-ar-administrador-evaluaciones-2020-03-16-10_52_17-AoPZ2Kyyg3uoVx1W.png",
      "images/screencapture-evaluacion-qa-gcba-gob-ar-formularios-2020-03-16-11_01_51-AwvjaK11yptG6PJw.png",
      "images/screencapture-evaluacion-qa-gcba-gob-ar-gestion-competencias-2020-03-16-11_00_35-m7V8vXggLgsev4bq.png",
      "images/screencapture-evaluacion-qa-gcba-gob-ar-administrador-evaluaciones-2020-03-16-10_56_10-Yle2lKkkzPUEQ4Mx.png"
    ],
    body: `
      <p>Served as <strong>Technical Lead</strong> for a performance evaluation system commissioned by the Buenos Aires City Government — designed to systematically, continuously, and objectively assess employee performance across city departments.</p>
      <h2>System Goals</h2>
      <ul>
        <li>Systematically evaluate employee performance against role requirements</li>
        <li>Identify training needs and devise short-term improvement plans</li>
        <li>Enhance communication to achieve predefined organizational objectives</li>
        <li>Promote transparency, objectivity, equity, and impartiality</li>
      </ul>
      <h2>Technical Leadership</h2>
      <p>Selected the technology stack: <strong>Angular</strong> (frontend), <strong>Java Spring Boot</strong> (backend), <strong>PostgreSQL</strong> (database). Defined business rules with the analyst and Product Owner. Introduced agile development methodology and devised an efficient code delivery process enabling the QA team to work independently.</p>
      <p>The evaluation process involved representatives from labor associations to ensure fairness. The platform is live at <a href="https://evaluaciongcaba.buenosaires.gob.ar/login" target="_blank">evaluaciongcaba.buenosaires.gob.ar</a>.</p>
    `
  }
];

// ─── Router ──────────────────────────────────────────────────────────────────
const pages = {
  home: document.getElementById('home'),
  portfolio: document.getElementById('portfolio'),
  about: document.getElementById('about'),
  contact: document.getElementById('contact'),
};
const navLinks = document.querySelectorAll('[data-page]');
let currentPage = 'home';
let currentProject = null;

function showPage(pageId, projectId = null) {
  // Update SEO tags
  updatePageSEO(pageId);

  // Hide all pages
  Object.values(pages).forEach(p => p && p.classList.remove('active'));
  navLinks.forEach(l => l.classList.remove('active'));

  // Close mobile menu
  document.querySelector('.nav-links').classList.remove('open');

  if (pageId === 'project' && projectId) {
    showProjectDetail(projectId);
    return;
  }

  const page = pages[pageId];
  if (!page) return;
  page.classList.add('active');
  currentPage = pageId;

  // Update nav active state
  navLinks.forEach(l => {
    if (l.dataset.page === pageId) l.classList.add('active');
  });

  window.scrollTo(0, 0);
  observeFadeIns();
}

function updatePageSEO(pageId) {
  const seo = PAGE_SEO[pageId];
  if (!seo) return;
  
  // Update title
  document.title = seo.title;
  
  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = seo.description;
  
  // Update og:title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.content = seo.title;
  
  // Update og:description
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.content = seo.description;
}

function showProjectDetail(projectId) {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return;

  // Update SEO for project
  document.title = `${project.title} | Juan Manuel Zaragoza`;
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = project.subtitle;

  // Update og tags for project
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.content = `${project.title} | Juan Manuel Zaragoza`;
  
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.content = project.subtitle;

  // Show portfolio page, hide grid, show detail
  pages.portfolio.classList.add('active');
  document.getElementById('portfolio-grid-view').style.display = 'none';
  document.getElementById('project-detail-view').style.display = 'block';

  const container = document.getElementById('project-detail-view');
  container.innerHTML = buildProjectDetail(project);
  currentProject = projectId;

  // Nav
  navLinks.forEach(l => {
    if (l.dataset.page === 'portfolio') l.classList.add('active');
  });

  window.scrollTo(0, 0);

  // Back button
  container.querySelector('.detail-back').addEventListener('click', () => {
    document.getElementById('portfolio-grid-view').style.display = '';
    document.getElementById('project-detail-view').style.display = 'none';
    currentProject = null;
    updatePageSEO('portfolio');
    window.scrollTo(0, 0);
  });
}

function buildProjectDetail(p) {
  const statusLabel = p.status === 'running' ? '● Running' : '✓ Completed';
  const galleryHtml = p.gallery.length > 0
    ? `<div class="detail-gallery">${p.gallery.map(g => `<img src="${g}" alt="" loading="lazy">`).join('')}</div>`
    : '';

  return `
    <div class="detail-hero">
      <button class="detail-back">← Back to Portfolio</button>
      <div class="detail-header">
        <div class="section-label">${p.date} &nbsp;·&nbsp; <span class="${p.status === 'running' ? 'tag running' : ''}">${statusLabel}</span></div>
        <h1 class="detail-title">${p.title}</h1>
        <p class="detail-subtitle">${p.subtitle}</p>
        <div class="detail-meta">
          ${p.tags.map(t => `<div class="detail-meta-item"><span class="label">Tech</span><span class="value">${t}</span></div>`).join('')}
        </div>
      </div>
    </div>
    <div class="detail-hero-img">
      <img src="${p.hero}" alt="${p.title}">
    </div>
    <div class="detail-body">${p.body}</div>
    ${galleryHtml}
  `;
}

// ─── Nav setup ───────────────────────────────────────────────────────────────
document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const page = el.dataset.page;
    const proj = el.dataset.project;
    if (proj) showPage('project', proj);
    else showPage(page);
  });
});

// Scrolled nav
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile toggle
const navToggle = document.querySelector('.nav-toggle');
navToggle?.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// ─── Home — Featured projects ─────────────────────────────────────────────────
function renderFeaturedProjects() {
  const featured = PROJECTS.slice(0, 6);
  const container = document.getElementById('featured-projects');
  if (!container) return;
  container.innerHTML = featured.map(p => buildProjectCard(p)).join('');
  container.querySelectorAll('.project-card').forEach((card) => {
    const title = card.querySelector('.project-card-title').textContent;
    const project = featured.find(p => p.title === title);
    if (project) {
      card.addEventListener('click', () => showPage('project', project.id));
    }
  });
}

function buildProjectCard(p) {
  const tagsHtml = p.tags.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('');
  const statusTag = p.status === 'running' ? '<span class="tag running">● Running</span>' : '';
  return `
    <div class="project-card fade-in">
      <img class="project-card-img" src="${p.hero}" alt="${p.title}" loading="lazy">
      <div class="project-card-tags">${statusTag}${tagsHtml}</div>
      <div class="project-card-title">${p.title}</div>
      <div class="project-card-desc">${p.subtitle}</div>
      <div class="project-card-footer">
        <span class="project-card-date">${p.date}</span>
        <span class="project-card-arrow">↗</span>
      </div>
    </div>
  `;
}

// ─── Portfolio page ───────────────────────────────────────────────────────────
function renderPortfolioGrid(filter = 'all') {
  const container = document.getElementById('all-projects-grid');
  if (!container) return;
  let filtered = [];
  if (filter === 'all') {
    filtered = PROJECTS;
  } else if (filter === 'running') {
    filtered = PROJECTS.filter(p => p.status === 'running');
  } else {
    filtered = PROJECTS.filter(p => p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())));
  }
  container.innerHTML = filtered.map(p => buildProjectCard(p)).join('');
  container.querySelectorAll('.project-card').forEach((card) => {
    // Find the project ID from the card's data or by matching the title
    const title = card.querySelector('.project-card-title').textContent;
    const project = filtered.find(p => p.title === title);
    if (project) {
      card.addEventListener('click', () => showPage('project', project.id));
    }
  });
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPortfolioGrid(btn.dataset.filter);
  });
});

// ─── FAQ ─────────────────────────────────────────────────────────────────────
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    item.classList.toggle('open');
  });
});

// ─── Fade-in observer ─────────────────────────────────────────────────────────
function observeFadeIns() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => observer.observe(el));
}

// ─── Init ─────────────────────────────────────────────────────────────────────
renderFeaturedProjects();
renderPortfolioGrid();
showPage('home');
observeFadeIns();
