(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.filter('currency', CurrencyFilter)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getBuyItems();

  toBuyList.buyItem = function(itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  }

  toBuyList.isEmpty = function() {
    return toBuyList.items.length == 0;
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtList = this;

  alreadyBoughtList.items = ShoppingListCheckOffService.getBoughtItems();

  alreadyBoughtList.isEmpty = function() {
    return alreadyBoughtList.items.length == 0;
  }
  alreadyBoughtList.calculateTotalPrice = function(itemIndex) {
    return ShoppingListCheckOffService.calculateTotalPrice(itemIndex);
  }
}

function ShoppingListCheckOffService() {
  var service = this;

  var buyItems = [
    {name: "Cookies", quantity: 10, pricePerItem: 0.50},
    {name: "Eggs", quantity: 12, pricePerItem: 0.10},
    {name: "Milk", quantity: 2, pricePerItem: 3.75},
    {name: "Ice Cream", quantity: 3, pricePerItem: 5.00},
    {name: "Coffee", quantity: 2, pricePerItem: 8.00}
  ];
  var boughtItems = [];

  service.getBuyItems = function() {
    return buyItems;
  };

  service.getBoughtItems = function() {
    return boughtItems;
  };

  service.buyItem = function(itemIndex) {
    var item = buyItems[itemIndex];
    buyItems.splice(itemIndex, 1);
    boughtItems.push(item);
  };

  service.calculateTotalPrice = function(itemIndex) {
    return boughtItems[itemIndex].quantity * boughtItems[itemIndex].pricePerItem;
  }

}

function CurrencyFilter() {
  return function (input) {
    input = input.toFixed(2);
    var retStr = "$$$"+input;
    return retStr;
  }
}
})();
