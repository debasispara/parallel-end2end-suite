/// <reference types="Cypress" />
/**
 * UI tests for etsy.com search page
 */

 const devices = ['desktop', 'mobile']

 devices.forEach((device, i) => {
     describe(`${device}: validate the functionality of search page`, { tags: [`@${device}`, '@homepage, @search'] }, () => {
        const searchInput = '#global-enhancements-search-query'
        const searchBtn = '.global-enhancements-search-input-btn-group__btn'

        before('open search page', () => {
            // Navigate to the page
            cy.navigate(device, '/');
        });

        beforeEach('stub unnecessary calls', () => {
            // Stubbing 3rd party or unnecessary network calls to make the test run fast
            cy.intercept('POST', '/api/v3/ajax/public/**/*', {
                statusCode: 204
            }).as('stubStatsd')
        })

        it('should validate correct page is loaded', () => {
             // Etsy icon is visible
             cy.get('.etsy-icon')
                 .first()
                 .scrollIntoView()
                 .should('be.visible')
        });


        it('should validate all the listing titles contain expected word', () => {
             cy.fixture('data/search-keys.json')
                 .then((searchKeys) => {
                       cy.get(searchInput)
                        .should('be.visible')
                        .should('not.be.disabled')
                        .clear()
                        .type(searchKeys.searchTerm);
                    cy.get(searchBtn).click()

                    cy.url().should('include', `q=${searchKeys.searchTerm}`)

                     const listingTitles = cy.get("span:contains('Ad by Etsy seller'):hidden()")
                         .parents('.v2-listing-card__info')
                         .find('.v2-listing-card__title');

                     const matchTitlesRegex = new RegExp(`${searchKeys.matchTitles.join('|')}`, 'g')
                     listingTitles.each((title) => {
                        cy.wrap(title).contains( matchTitlesRegex, { matchCase: false });
                    });
                 })
        });

        it('should validate sorting shows item in the correct order', () => {
            cy.get('#sortby')
                 .should('be.visible')
                 .scrollIntoView()
                 .click()
            cy.get('#sortby a[data-sort-by="price_desc"]')
                .should('be.visible')
                .click();

            cy.url().should('include', 'order=price_desc')

            // Page gives error for some reason which is outside my control.
            // So reloading the page for now.
            cy.reload()

            cy.get('#sortby .wt-menu__trigger__label span')
                .last()
                .contains('Highest Price')

             const organicListingsPriceElms = cy.get("span:contains('Ad by Etsy seller'):hidden()")
                 .parents('.v2-listing-card__info')
                 .find('.n-listing-card__price .wt-text-title-01 .currency-value');

            let prices = []
            organicListingsPriceElms.should('have.length', 48).each(($priceElms) => {
                prices.push($priceElms.text());
            });

            let previousNumber = 0;
            cy.wrap(prices)
                .then((numbers) => {
                    cy.log(JSON.stringify(numbers));
                    numbers.forEach(function (number, index) {
                        if(index !== 0){
                            // This assertion fails because of a bug, the items are not truly sorted by price.
                            expect(previousNumber >= number, `${previousNumber} should be greater than or equal ${number}`).to.be.true
                            previousNumber = number
                        }else {
                            previousNumber = number
                        }
                    });
                });
        });
     });
 });

