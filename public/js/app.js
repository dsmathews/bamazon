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
            $('<td>').text(item.product_name),
            $('<td>').text(item.stock_quantity),
            $('<td>').text(`$${item.price}`),
            $('<td>').append(input),
            $('<td>').append(button)
        );
        return tr;
    };
    const addRow = function (qty, item) {
        const itemSubtotal = item.price * qty;
        cart += itemSubtotal;
        item.stock_quantity -= qty;

        cartItems.push(item);

        const tr = $('<tr>').addclass(`cart-${item.id}`);
        tr.append(
            $('<td>').text(item.product_name),
            $('<td>').text(`${item.price}`),
            $('<td>').text(qty),
            $('<td>').text(`${itemSubtotal.toFixed(2)}`)
        );
        $('#cart-items').append(tr);
        $('.cart-total').text(`$${cartTotal.toFixed(2)}`);
    };
    const message = function (type, text) {
        $('#messages')
            .addClass(`alert alert-${type}`)
            .text(text);

        // shows message for set time
        timerInterval = setTimeout(clearMessages, 5000);
    };
    // clear messages when items added to cart
    const clearMessages = function () {
        $('#messages').empty().removeClass();
    };

    // id to variable and make api call
    const addItemToCart = function () {

        clearMessages();
        const id = $(this).attr('data-id');

        // running the update cart func
        $.get(`/api/products/${id}`).then(updateCart);
    };
    const updateCart = function (data) {
        const numRequested = $(`#${data.id}`).val();

        // comparison to check quantity and if not enough then message
        if (numRequested > data.stock_quantity) {
            message('danger', `We're sorry. We only have ${data.stock_quantity} in stock`);
        } else {
            addRow(numRequested, data);
            message('success', 'Items successfully added to cart!');
            $(`#${data.id}`).val('');
        }
    }; const checkout = function () {
        calculateTotal();

        const index = cartItems.length - 1;

        updateItem(index);
    };

    function updateItem(i) {
        if (i >= 0) {

            $.ajax({
                method: 'PUT',
                url: `/api/products/${cartItems[i].id}`,
                data: cartItems[i]
            }).then(function (data) {
                console.log(i, "this is the index");
                index = index - 1;
                updateItem(index);
            });
        }
    }

    function calculateTotal() {
        let total = 0;
        cartItems.forEach(e => {
            total += e.price;
        });
        $('.cart-total').text(total);
    }

    getItems();

    $('#sale-items').on('click', '.add-to-cart', addItemToCart);
    $('#checkout').on('click', checkout);
    $('#close').on('click', getItems);
});