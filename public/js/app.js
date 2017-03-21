angular
  .module("meanRestaurant", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("Restaurant", [
    "$resource",
    Restaurant
  ])
  .controller("indexCtrl", [
    "$state",
    "Restaurant",
    indexController
  ])
  .controller("showCtrl", [
    "$state",
    "$stateParams",
    "Restaurant",
    showController
  ])


function Router($stateProvider) {
  $stateProvider
  .state("index", {
    url:"/restaurants",
    templateUrl: "/assets/js/ng-views/index.html",
    controller: "indexCtrl",
    controllerAs: "vm"
  })
  .state("show", {
    url:"/restaurants/:name",
    templateUrl: "/assets/js/ng-views/show.html",
    controller: "showCtrl",
    controllerAs: "vm"
  })
}

function Restaurant ($resource) {
  return $resource("/api/restaurants/:name", {}, {
    update: {method: "PUT"}
  })
}

function indexController ($state, Restaurant) {
  this.restaurants = Restaurant.query()
  this.newRestaurant = new Restaurant()
  this.create = function() {
    this.newRestaurant.$save().then(function(restaurant) {
      $state.go("show", {name: restaurant.name})
    })
  }
}

function showController ($state, $stateParams, Restaurant) {
  this.restaurant = Restaurant.get({name: $stateParams.name})
  this.update = function() {
    this.restaurant.$update({name: $stateParams.name})
    $state.go("index")
  }
  this.destroy = function() {
    this.restaurant.$delete({name: $stateParams.name}).then(function() {
      $state.go("index")
    })
  }
}
