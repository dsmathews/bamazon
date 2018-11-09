$(function () {
    let productList = [];
    let cart = 0;

    const render = function(items) {
        $('modal').modal('hide');
        $('#sale-items').empty();

        items.forEach(function(item) {
            $('#sale-items').append(buildRow(item));
        });        
    };

    const getItems = function () {
        $.get('/api/Products').done(render);
        // console.log(getItems);
    };

    const buildRow = function (item) {
        const tr = $('<tr>');

        const input = $('<input>').attr({
            type: 'number',
            min: 0,
            id: item.id
        });
        const button = $('<button>')
        .addClass('btn-warning-add-to-cart')
        .text('Add to Cart')
        .attr('data-id', item.id);

        //appending each item to the div
        tr.append(
            $('<td>').append(input),
            $('<td>').text(item.product_name),
            $('<td>').text(item.stock_quantity),
            $('<td>').text(`$${item.price}`),
            $('<td>').append(button)
        );
        return tr;
    };
    

    getItems();
    
});