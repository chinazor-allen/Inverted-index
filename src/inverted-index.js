class invertedIndex{
  constructor(){
    this.files = {};
    this.indexTable = {};
  }

  createIndex(filename){
    const index = {};
    if (Object.hasOwnProperty.call(this.files, filename)){
      const currentFile =  this.files[filename];
      currentFile.forEach((currentDoc, docIndex) => {
        const currentToken = invertedIndexHelper.getToken(`${currentDoc.title} ${currentDoc.text}`);
        currentToken.map((word) =>{
          if (index[word]){
            index[word].push(docIndex);
          }
          else{
            index[word] = [docIndex];
          }
        });
      });
      this.indexTable[filename] = index;
    }else{
      return false;
    }
  }

  getIndex (filename) {
      return this.indexTable[filename];
    }
  
  searchIndex (terms, filenames){
    this.searchResult = {};
    if (typeof filenames === 'undefined'){
     filenames =  Object.keys(newInvert.indexTable); 
    }
    const allSearchTerms = invertedIndexHelper.getToken (terms);
    filenames.forEach((file) => {
      if (file in this.indexTable){
        allSearchTerms.forEach((term) => {
          if (term in this.indexTable[file]){
            if(file in this.searchResult){
              this.searchResult[file][term] = this.indexTable[file][term]; 
            }
            else{
              this.searchResult[file] = {};
              this.searchResult[file][term] = this.indexTable[file][term]; 
            }
            
          }
        });
      }
      
    });
    return this.searchResult;
    }
}
