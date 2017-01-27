var invApp = angular.module('invertedIndex',[]);
invApp.controller("invertedController",function($scope){
    let InvertedIndex = new invertedIndex();
    $scope.title = "Testing Inverted Index";
    $scope.selectedFile = "";

    $scope.uploadFile = () => {

        for(let index in $scope.files) {
            var reader = new FileReader();

            reader.onload = event => {
                var data = JSON.parse(event.target.result);
                var filename = $scope.files[index].name.replace(/\s|\.|json/g, "");
                InvertedIndex.files[filename] = data;
                InvertedIndex.createIndex(filename);

            };
             if($scope.files[index].type === 'application/json') {
                 reader.readAsText($scope.files[index]);
             }
        };
    };

    $scope.getIndex = () => {
        if($scope.selectedFile.length !== 0) {
            $scope.fileIndex = InvertedIndex.getIndex($scope.selectedFile.replace(/\s|\.|json/g, ""));
        }
        console.log($scope.fileIndex);
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
    }
});
