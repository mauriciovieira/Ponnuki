define(['knockout'], function(ko) {
    ko.bindingHandlers.stones = {
        update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
            var ctx = element.getContext('2d');

            viewModel.clearBoard(ctx);
            viewModel.drawStones(ctx);
        }
    };

    return ko;
});