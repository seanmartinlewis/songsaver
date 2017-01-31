angular.module('Ratmilk', [

])
  .controller('MainCtrl', function ($scope) {
      $scope.categories = [
          {"id": 0, "name": "50s"},
          {"id": 1, "name": "60s"},
          {"id": 2, "name": "70s"},
          {"id": 3, "name": "80s"}
      ];

      $scope.bookmarks = [
        {'id': 0, 'title': 'cold cold heart', 'artist': 'Hank Williams', 'category': '50s', 'url': "https://www.youtube.com/watch?v=-yCQraOX4Bw"},
        {'id': 1, 'title': 'I Fall To Pieces', 'artist': 'Patsy Cline', 'category': '60s', 'url': "https://www.youtube.com/watch?v=HG-8uZg2uV0"},
        {'id': 2, 'title': 'Thank You', 'artist': 'Sly and the family Stone', 'category': '70s', 'url': "https://www.youtube.com/watch?v=6Ptrc2cWRxU"},
        {'id': 4, 'title': 'Going Down', 'artist': 'JJ Cale', 'category': '80s', 'url': "https://www.youtube.com/watch?v=Fm-euFpRLMg"},
      ];

      $scope.isCreating = false;
      $scope.isEditing = false;
      $scope.currentCategory = null;
      $scope.editedBookmark = null;

      function isCurrentCategory(category) {
          return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
      }

      function setCurrentCategory(category) {
          $scope.currentCategory = category;

          cancelCreating();
          cancelEditing();
      }

      $scope.isCurrentCategory = isCurrentCategory;
      $scope.setCurrentCategory = setCurrentCategory;

      function setEditedBookmark(bookmark) {
          $scope.editedBookmark = angular.copy(bookmark);
      }

      function isSelectedBookmark(bookmarkId) {
          return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
      }

      $scope.deleteBookmark = deleteBookmark;
      $scope.setEditedBookmark = setEditedBookmark;
      $scope.isSelectedBookmark = isSelectedBookmark;

      function deleteBookmark(bookmark) {
        _.remove($scope.bookmarks, function (b) {
            return b.id == bookmark.id;
        });
      }

      function resetCreateForm() {
          $scope.newBookmark = {
              title: '',
              url: '',
              category: $scope.currentCategory.name
          };
      }

      //-------------------------------------------------------------------------------------------------
      // CRUD
      //-------------------------------------------------------------------------------------------------
      function createBookmark(bookmark) {
          bookmark.id = $scope.bookmarks.length;
          $scope.bookmarks.push(bookmark);

          resetCreateForm();
      }


      function updateBookmark(bookmark) {
          var index = _.findIndex($scope.bookmarks, function (b) {
              return b.id == bookmark.id
          });
          $scope.bookmarks[index] = bookmark;

          $scope.editedBookmark = null;
          $scope.isEditing = false;
      }

      $scope.createBookmark = createBookmark;
      $scope.updateBookmark = updateBookmark;


      //-------------------------------------------------------------------------------------------------
      // CREATING AND EDITING STATES
      //-------------------------------------------------------------------------------------------------
      function shouldShowCreating() {
          return $scope.currentCategory && !$scope.isEditing;
      }

      function startCreating() {
          $scope.isCreating = true;
          $scope.isEditing = false;
          resetCreateForm();
      }

      function cancelCreating() {
          $scope.isCreating = false;
      }

      $scope.shouldShowCreating = shouldShowCreating;
      $scope.startCreating = startCreating;
      $scope.cancelCreating = cancelCreating;

      function shouldShowEditing() {
          return $scope.isEditing && !$scope.isCreating;
      }

      function startEditing() {
          $scope.isCreating = false;
          $scope.isEditing = true;
      }

      function cancelEditing() {
          $scope.isEditing = false;
          $scope.editedBookmark = null;
      }

      $scope.startEditing = startEditing;
      $scope.cancelEditing = cancelEditing;
      $scope.shouldShowEditing = shouldShowEditing;
  })
