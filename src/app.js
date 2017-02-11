var invApp = angular.module('invertedIndex',[]);
invApp.controller("invertedController",function($scope, $window){
    let helper = $window.invertedIndexHelper;
    let InvertedIndex = new invertedIndex(helper);
    $scope.title = "Inverted Index";
    $scope.selectedFile = "";
    $scope.files = {};
    $scope.filesUploaded = [];
    $scope.errors = ["Past Eight", "Leave Me"];
    $scope.error = false;
    $scope.search = false;


    $scope.uploadFile = () => {
        $scope.error = false;
        $scope.errors = [];

        for(let index in $scope.files) {
            var reader = new FileReader();

            reader.onload = (event) => {

                var data = JSON.parse(event.target.result);
                var filename = $scope.files[index].name.replace(/\s|\.|json/g, "");

                if (helper.isValidFile(data)){
                    InvertedIndex.files[filename] = data;
                    InvertedIndex.createIndex(filename, data);
                    if(!$scope.filesUploaded.includes($scope.files[index].name)) {
                        $scope.filesUploaded.push($scope.files[index].name);
                    }
                } else {
                    $scope.$apply(function() {
                        $scope.error = true;
                        $scope.errors.push(`${$scope.files[index].name} is not a valid file`);
                    });
                }
            };
            
             if(typeof parseInt(index) === 'number' && $scope.files[index].type === 'application/json') {
                 reader.readAsText($scope.files[index]);
             }
        }
  
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.error = false;
                $scope.errors = [];
            });
        }, 5000);

    };

    $scope.getIndex = () => {
        $scope.search = false;
        if($scope.selectedFile.length !== 0) {
            let fileKey = $scope.selectedFile.replace(/\s|\.|json/g, "");
            $scope.booksIndexed = InvertedIndex.files[fileKey];
            $scope.fileIndex = InvertedIndex.getIndex(fileKey);
            debugger;
            console.log(fileKey);
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
        }

    };
});

invApp.directive('fileUpload', function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            elem.bind('change', () => {
                scope.$apply(() => {
                    scope.files = elem[0].files;
                });
            });
        }
    };
});
