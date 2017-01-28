var invApp = angular.module('invertedIndex',[]);
invApp.controller("invertedController",function($scope){
    let InvertedIndex = new invertedIndex();
    $scope.title = "Testing Inverted Index";
    $scope.selectedFile = "";
    $scope.files = {};

    $scope.uploadFile = () => {

        for(let index in $scope.files) {
            var reader = new FileReader();

            reader.onload = event => {

                var data = JSON.parse(event.target.result);
                // debugger;
                var filename = $scope.files[index].name.replace(/\s|\.|json/g, "");

                InvertedIndex.files[filename] = data;
                InvertedIndex.createIndex(filename);
                console.log($scope.files[index])

            };
             if(typeof parseInt(index) === 'number' && $scope.files[index].type === 'application/json') {
                 reader.readAsText($scope.files[index]);
             }
        }
    };

    $scope.getIndex = () => {
        if($scope.selectedFile.length !== 0) {
            let fileKey = $scope.selectedFile.replace(/\s|\.|json/g, "");
            $scope.booksIndexed = InvertedIndex.files[fileKey];
            $scope.fileIndex = InvertedIndex.getIndex(fileKey);
        } else {
            $scope.booksIndexed = [];
            $scope.fileIndex = {"not found": "nothing was found"};
        }
    };

    $scope.searchIndex =() => {

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
