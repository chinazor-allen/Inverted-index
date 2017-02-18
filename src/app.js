var invApp = angular.module('InvertedIndex', []);
invApp.controller("invertedController", function ($scope, $window) {
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

        for (let index in $scope.files) {
            var reader = new FileReader();

            reader.onload = (event) => {
                var filename = $scope.files[index].name.replace(/\s|\.|json/g, "");

                try {
                    if (helper.isValidFile(event.target.result)) {
                        var data = JSON.parse(event.target.result);
                        invertedIndex.files[filename] = data;
                        if (!$scope.filesUploaded.includes($scope.files[index].name)) {
                            invertedIndex.createIndex(filename, data);
                            $scope.$apply(() => {
                                $scope.filesUploaded.push($scope.files[index].name);
                            });
                            swal(`uploaded successfully`);
                        }
                    } else {
                        swal("Ooops!!!! \n Enter a valid Json file");
                    }
                } catch (e) {
                    swal(e.message);
                }
            };

            if (typeof parseInt(index) === 'number' && $scope.files[index].type === 'application/json') {
                reader.readAsText($scope.files[index]);
            }
        }
    };

    $scope.getIndex = () => {
        $scope.books = invertedIndex.files;
        if ($scope.selectedFile.length !== 0) {
            let fileKey = $scope.selectedFile.replace(/\s|\.|json/g, "");
            $scope.fileIndex = invertedIndex.getIndex(fileKey);
        } else {
            $scope.fileIndex = invertedIndex.getIndex();
        }
    };

    $scope.searchIndex = () => {
        if ($scope.terms && $scope.terms.length > 0) {
            if ($scope.selectedFile.length > 0) {
                let fileKey = $scope.selectedFile.replace(/\s|\.|json/g, "");
                $scope.booksIndexed = invertedIndex.files;
                $scope.fileIndex = invertedIndex.searchIndex(fileKey, $scope.terms);

            } else {
                $scope.booksIndexed = invertedIndex.files;
                $scope.fileIndex = invertedIndex.searchIndex(null, $scope.terms);
            }
        } else {
            swal("Search terms empty");
        }
    };
});

invApp.directive('fileUpload', function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            elem.bind('change', () => {
                scope.$apply(() => {
                    scope.files = elem[0].files;
                });
            });
        }
    };
});