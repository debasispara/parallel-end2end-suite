// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
    'navigate',
    (device = 'desktop', pagePath, options = {}) => {
        const fullUrl = urlConstruction(pagePath);
        cy.log(`Running test on ${device} with url ${fullUrl}`);

        // Desktop viewport and user-agent
        let viewportWidth = 1440;
        let viewportHeight = 900;
        let userAgent = '';

        switch (device) {
            case 'mobile':
                // Mobile viewport and user-agent
                viewportWidth = 390;
                viewportHeight = 844;
                userAgent =
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36';
                break;
            default:
                // Nothing to do here
                break;
        }

        Cypress.config('viewportWidth', viewportWidth);
        Cypress.config('viewportHeight', viewportHeight);
        cy.viewport(viewportWidth, viewportHeight);

        if (userAgent) {
            options.headers = { 'user-agent': userAgent };
        }

        return cy.visit(fullUrl, options);
    }
);

function urlConstruction(pagePath) {
    let domain;

    const test_env = Cypress.env('test_env')
        ? Cypress.env('test_env')
        : 'live';
    switch (test_env) {
        case 'live':
            domain = `etsy.com`;
            break;
        default:
            domain = `${test_env}.etsy.com`;
            break;
    }

    Cypress.env('domain', domain);

    return `https://www.${domain}${pagePath}`;
}