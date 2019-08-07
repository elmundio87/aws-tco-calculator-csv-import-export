# AWS TCO Calculator CSV Import/Export

This script allows you to export the Server and Storage tables from the [AWS TCO calculator](https://awstcocalculator.com/#) as CSV files, so that they can be re-imported later.

## Installation

Clone this repository or copy the contents of `userscript.js` to the clipboard

**Firefox:** Install the Greasemonkey extension and import `userscript.js` from this repository

**Chrome:** Install the Tampermonkey extension and import `userscript.js` from this repository

## Usage

The Servers and Storage tables both have 2 extra buttons.

* "Export CSV" will gather any servers/storage information that has been entered into the calculator and export a CSV file.

* "Import CSV" will re-populate the calculator from the data in a local CSV file. This can either be a set of previously exported data, or a hand-crafted file.

## Screenshot

![Two extra buttons](https://github.com/elmundio87/aws-tco-calculator-csv-import-export/blob/master/preview.png "Preview")
