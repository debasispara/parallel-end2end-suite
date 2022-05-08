# Parallel Finance

UI test suite for Parallel Finance applications


## Table of Contents

- [Setup](README.md#setup)
- [Quick Start](README.md#quick-start)
- [Running Tests](README.md#running-tests)
- [Reports](README.md#reports)

## Quick Start

    git clone https://github.com/gonazmul/parallel-end2end-suite.git
    cd parallel-end2end-suite
    nvm use && npm i
    npm run cy:test -- --env test_env=live
    npm run cy:report

## Setup

Do the following on your terminal -

**1. Clone web-ui-suite git repo in your git directory**

    git clone https://github.com/gonazmul/parallel-end2end-suite.git


**2. Go to web-ui-suite directory**

    cd parallel-end2end-suite

**3. Install nvm version required for this repo**

    nvm i && nvm use

**4. Install npm dependencies**

    npm i

---

## Running Tests


#### 1. Run on Cypress Test Runner

    npm run cy:open

_Open with specific test environment (live, staging, qa or dev):_

    npm run cy:open -- --env test_env=live

#### 2. Run locally via CLI

    npm run cy:test -- --env test_env=live

#### 3. Run tagged tests

    `npm run cy:test -- --env grepTags=@mobile`

### Run using docker image

    docker run -it -v $PWD:/e2e -w /e2e cypress/included:9.6.0

### Run on Github Actions

1. [Go to Actions tab on the Github](https://github.com/gonazmul/parallel-end2end-suite/actions)
2. Click on `manual-end2end-suite` from the list of workflows
3. Choose desired configurations* from `Run Workflow` dropdown and hit `Run Workflow`

## Reports
Run `npm run cy:report` to open the report.
