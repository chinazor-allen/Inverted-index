# Inverted-index
[![Build Status](https://travis-ci.org/Andela-callen/Inverted-index.svg?branch=feedback)](https://travis-ci.org/Andela-callen/Inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/Andela-callen/Inverted-index/badge.svg?branch=master)](https://coveralls.io/github/Andela-callen/Inverted-index?branch=master)

# Inverted Index

The Inverted index application allows a user to search for text blocks in the array that contain a specified collection of words.
The user can upload multiple JSON files with the correct format displayed below and create an indexes for them, search for words in
all files and one file.

The link to the hosted application on heroku can be found [here](https://inverted-index-andela.herokuapp.com)

#### How can I get started with the api?
- To use the application locally, clone the repository, type ``` cd Inverted-index ``` in the command prompt and run ``` npm install ```. It will download all dependencies.
- Run ``` npm start ``` on the command line to start the application.
- Create a JSON file with the following format. You can upload multiple files that follows the format below:
```
[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]
```
- Click `choose files` button to upload JSON files
- Click `Upload` button to create an index
- Select File from application meun and Click `Create Index`
- Enter any text(s) to search for and select the file or all files to search in.
- Click `Search` button to perform the search

#### External Dependencies for the app
1. Javascript(ES6)
2. AngularJS
3. Gulp
4. Browser-sync
5. Node.js

#### How do I run the tests?
- running ``` npm test ``` on the command line also displays the result on the command line


#### What are the limitations of the api?
The limitations of this api is that the file has to be in a jSON format and also the JSON file has to be an array of Objects. The upload mechanism should allow for text file and also different word documents.


### Contributing
1. Fork this repository to your account.
2. Clone your repositry: git clone git@github.com:your-username/inverted-index.git OR git clone https://github.com/your-username/inverted-index.git
3. Create your feature branch: git checkout -b new-feature
4. Commit your changes: git commit -m "did something"
5. Push to the remote branch: git push origin new-feature
6. Open a pull request.