$(function () {
    let productList = [];
    let cart = 0;

    const render = function (items) {
        $('modal').modal('hide');
        $('#sale-items').empty();

        items.forEach(function (item) {
            $('#sale-items').append(buildRow(item));
        });
    };

    const getItems = function () {
        $.get('/api/Products').then(render);
        // console.log(getItems);
    };

    const buildRow = function (item) {
        const tr = $('<tr>');

        const input = $('<input>').attr({
            type: 'number',
            min: 0,
            'data-id': item.id
        });

        const button = $('<button>')
            .addClass('btn-warning-add-to-cart addToCart')
            .text('Add to Cart')
            .attr('data-id', item.id);

        //appending each item to the div
        tr.append(
            $('<td class="input">').append(input),
            $('<td class= "productName" >').text(item.product_name),
            $('<td class="stock">').text(item.stock_quantity),
            $('<td class= "price">').text(`$${item.price}`),
            $('<td>').append(button)
        );
        return tr;
    };

    const numberItems = function () {
        let uniqueID = $(this).attr("data-id");
        console.log(uniqueID);
        console.log($('input').attr(`data-id=${uniqueID}`).val())  


    
    };

$('#sale-items').on('click', '.addToCart', numberItems);
getItems();
    
});