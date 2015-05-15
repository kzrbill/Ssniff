# Solution Sniffer

This is a *sniffer* to catch MS Visual Studio solution and project *smells*  before they become a problem e.g. assembly version inconsistencies, .net version project inconsistencies, unsigned assemblies etc. Rather than just face the same issues time and time again, it is the aim that this will grow to increase first time quality productivity for some .net developers.

## To contribute

Create initial smell classes which represent potential VS .net issues in '/lib/smells' directory. They can start as manual task descriptions (providing results which describe what to do to manually fix somethething) and evolve into functioning software, which will really tell you if you have an issue or not given an assembly path.

## Pre-requesites

Install node js - https://nodejs.org/
Set the NODE_PATH environment variable. 

## Install

    >> git clone git@github.com:kzrbill/solution_sniffer.git

or 

    >> git clone https://github.com/kzrbill/solution_sniffer.git

## Run

    >> node app.js 

## Running the tests

    >>  jasmine-node .\test\ --verbose







