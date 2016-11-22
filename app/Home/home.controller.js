(function () {
    'use strict';

    angular
        .module('app')
        .controller('GithubController', GithubController);

    GithubController.$inject = ['$http'];

    /* @ngInject */
    function GithubController($http) {
        var vm = this;

        vm.callGithubApi = callGithubApi;
        vm.callGithubRepositories = callGithubRepositories;
        vm.data = false;

        //////////////////////

        function callGithubApi(user) {
            vm.loading = true;
            $http
                .get('http://api.github.com/users/' + user + '?access_token=205cedb0c7dc537c5c04e152550d6ec58fef68a2')
                .then(function(response) {
                    vm.data = true;
                    vm.allData= response.data;
                    vm.name = response.data.name;
                    vm.publicRepos= response.data.public_repos;
                    vm.followers= response.data.followers;
                    vm.following= response.data.following;
                    vm.img= response.data.avatar_url;
                    vm.location= response.data.location;
                    vm.hireable= response.data.hireable || "No";
                    vm.created= response.data.created_at;
                    vm.reposUrl= response.data.repos_url;
                    vm.loading = false;
                })
                .catch(function(error) {
                    alert('An error occured downloading from Github');
            });
        }

        function callGithubRepositories(user1) {
            $http
                .get(vm.reposUrl + '?access_token=205cedb0c7dc537c5c04e152550d6ec58fef68a2')
                .then(function(secondResponse) {
                        vm.repos= secondResponse.data
                    })
                .catch(function(error) {
                    alert('An error occured downloading repositories');
            });
        }
    }
})();
