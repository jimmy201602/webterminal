## angular-module-shim

### Install

```
bower install --save angular-module-shim
```

### Rationale

Adjusts the behaviour of `angular.module` so as to make module retrieval and creation order agnostic.

In other words you can append components onto modules without worrying whether the module has been explicitly created yet.

Particularly useful when your Angular project has a scalable/granular file structure with module creation and retrieval happening in individual files but your build process is just concatenating app files together in an arbitrary order.

Makes the following code legal:

```javascript
angular.module('foo')
    .controller('FooCtrl',function () {});

angular.module('foo',['bar','baz']);
```

### Thanks/links

- [An improved Angular.module()](http://www.hiddentao.com/archives/2013/11/04/an-improved-angular-module-split-your-modules-into-multiple-files/) - Hiddentao
- [Stop Angular Overrides](https://github.com/bahmutov/stop-angular-overrides) - Bahmutov
- [Creating a module twice fails silently #1779](https://github.com/angular/angular.js/issues/1779) - Angular Issue
