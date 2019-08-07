# AWS TCO Calculator CSV Import/Export

This script allows you to export the Server and Storage tables from the AWS TCO calculator as CSV files, so that they can be re-imported later.

## Installation

Firefox: Install the Greasemonkey extension and import userscript.js
Chrome: Install the Tampermonkey extension and import userscript.jsa

## Usage

The Servers and Storage tables both have 2 extra buttons.

* "Export CSV" will gather any servers/storage information that has been entered into the calculator and export a CSV file.

* "Import CSV" will re-populate the calculator from the data in a local CSV file. This can either be a set of previously exported data, or a hand-crafted file.

![Two extra buttons](https://github.com/elmundio87/aws-tco-calculator-csv-import-export/blob/master/preview.png "Preview")
