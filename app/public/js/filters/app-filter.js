angular.module('TogglePlayAppFilters', [])
    .filter('NameFilter', [
        function () {
            return function (apps, pattern) {

                if (pattern != null &&
                    !angular.isUndefined(apps) &&
                    !angular.isUndefined(pattern)) {
                    
                    var filteredApps = [];
                    angular.forEach(apps, function (app) {
                        if (angular.uppercase(app.name).indexOf(angular.uppercase(pattern)) == 0) {
                            filteredApps.push(app);
                        }
                    });
                    
                    return filteredApps;
                }
                else {
                    return apps;
                }
            };
        }
    ])
    .filter('CategoryFilter', [
        function () {
            return function (apps, selectedCategory) {

                if (selectedCategory != null &&
                    !angular.isUndefined(apps) &&
                    !angular.isUndefined(selectedCategory)) {
                    
                    var filteredApps = [];
                    angular.forEach(apps, function (app) {
                        if (angular.equals(app.category.label, selectedCategory.label)) {
                            filteredApps.push(app);
                        }
                    });
                    
                    return filteredApps;
                }
                else {
                    return apps;
                }
            };
        }
    ])
    .filter('PriceFilter', [
        function () {
            return function (apps, cost) {

                if (cost != null &&
                    !angular.isUndefined(apps) &&
                    !angular.isUndefined(cost) &&
                    (angular.equals(cost, "free") || angular.equals(cost, "payable"))) {
                    
                    var filteredFreeApps = [];
                    var filteredPayableApps = [];
                    angular.forEach(apps, function (app) {
                        if (app.price == 0) {
                            filteredFreeApps.push(app);
                        }
                        else{
                            filteredPayableApps.push(app);
                        }
                    });
                    
                    return (angular.equals(cost, "free")) ? filteredFreeApps : filteredPayableApps;
                }
                else {
                    return apps;
                }
            };
        }
    ]);