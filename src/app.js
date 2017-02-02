var invApp = angular.module('invertedIndex',[]);
invApp.controller("invertedController",function($scope, $window){
    // let helper = invertedIndexHelper;
    let InvertedIndex = new invertedIndex($window.invertedIndexHelper);
    $scope.title = "Inverted Index";
    $scope.selectedFile = "";
    $scope.files = {};
    $scope.filesUploaded = [];
    $scope.search = false;
    $scope.uploadFile = () => {

        for(let index in $scope.files) {
            var reader = new FileReader();

            reader.onload = (event) => {

                var data = JSON.parse(event.target.result);
                var filename = $scope.files[index].name.replace(/\s|\.|json/g, "");

                if(!InvertedIndex.files[filename]) {
                    InvertedIndex.files.allBooks = InvertedIndex.files.allBooks.concat(data);
                }
                InvertedIndex.files[filename] = data;
                
                InvertedIndex.createIndex(filename);
                InvertedIndex.createIndex();
                console.log(InvertedIndex);
            };
            
             if(typeof parseInt(index) === 'number' && $scope.files[index].type === 'application/json') {
                 reader.readAsText($scope.files[index]);
             }
        }
    };

    $scope.getIndex = () => {
        $scope.search = false;
        if($scope.selectedFile.length !== 0) {
            let fileKey = $scope.selectedFile.replace(/\s|\.|json/g, "");
            $scope.booksIndexed = InvertedIndex.files[fileKey];
            $scope.fileIndex = InvertedIndex.getIndex(fileKey);
        } else {
            $scope.booksIndexed = [];
            $scope.fileIndex = {"not found": "nothing was found"};
        }
    };

    $scope.searchIndex =(terms) => {
        $scope.search = true;
        if($scope.selectedFile.length > 0) {
            let fileKey = $scope.selectedFile.replace(/\s|\.|json/g, "");
            $scope.booksIndexed = InvertedIndex.files[fileKey];
            $scope.fileIndex = InvertedIndex.searchIndex($scope.terms, fileKey);
        } else {
            $scope.booksIndexed = InvertedIndex.files.allBooks;
            $scope.fileIndex = InvertedIndex.searchIndex($scope.terms);
            console.log(InvertedIndex.files.allBooks);
        }

    };
});

invApp.directive('fileUpload', function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            elem.bind('change', () => {
                scope.$apply(() => {
                    angular.forEach(elem[0].files, (value, index) => {
                        if(!scope.filesUploaded.includes(value.name)) {
                            scope.filesUploaded.push(value.name);
                        }
                    });
                    scope.files = elem[0].files;
                });
            });
        }
    };
});
