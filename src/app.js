var invApp = angular.module('InvertedIndex',[]);
invApp.controller("invertedController",function($scope, $window){
    let helper = $window.InvertedIndexHelper;
    let invertedIndex = new InvertedIndex(helper);
    $scope.title = "Inverted Index";
    $scope.selectedFile = "";
    $scope.files = {};
    $scope.filesUploaded = [];
    $scope.errors = ["Past Eight", "Leave Me"];
    $scope.error = false;
    $scope.search = false;
    $scope.creating = false;

    $scope.uploadFile = () => {
        $scope.error = false;
        $scope.errors = [];

        for(let index in $scope.files) {
            var reader = new FileReader();

            reader.onload = (event) => {

                try {
                var data = helper.isValidFile(event.target.result);
                var filename = $scope.files[index].name.replace(/\s|\.|json/g, "");
                    if(data) {
                        invertedIndex.files[filename] = data;
                        if(!$scope.filesUploaded.includes($scope.files[index].name)) {
                            $scope.$apply(() => {
                                $scope.filesUploaded.push($scope.files[index].name);
                            });
                            swal(`uploaded successfully`);
                        }
                    } else {
                        swal("Ooops!!!!");
                    }
                } catch(e) {
                    swal(e.message);
                }
            };
            
             if(typeof parseInt(index) === 'number' && $scope.files[index].type === 'application/json') {
                 reader.readAsText($scope.files[index]);
             }
        }
    };

    $scope.getIndex = () => {
        $scope.creating = true;
        $scope.search = false;
        if($scope.selectedFile.length !== 0) {
            let fileKey = $scope.selectedFile.replace(/\s|\.|json/g, "");
            $scope.booksIndexed = invertedIndex.files[fileKey];
            invertedIndex.createIndex(fileKey, $scope.booksIndexed);
            $scope.fileIndex = invertedIndex.getIndex(fileKey);
        } else {
            $scope.booksIndexed = [];
            $scope.fileIndex = {"not found": "nothing was found"};
            swal("Choose a file to create index");
        }
    };

    $scope.searchIndex =() => {

            if($scope.terms && $scope.terms.length > 0) {
                $scope.creating = false;
                $scope.search = true;
                if($scope.selectedFile.length > 0) {
                    let fileKey = $scope.selectedFile.replace(/\s|\.|json/g, "");
                    $scope.booksIndexed = invertedIndex.files;
                    $scope.fileIndex = invertedIndex.searchIndex($scope.terms, fileKey);
                    
                } else {
                    $scope.booksIndexed = invertedIndex.files;
                    $scope.fileIndex = invertedIndex.searchIndex($scope.terms);
                }
            } else {
                swal("Search terms empty");
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