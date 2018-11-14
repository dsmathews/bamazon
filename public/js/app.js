$(function () {


    let cartTotal = 0;
    let cartItems = [];

    // setting a timer for the message to display for a set amount of time
    let timerInterval;

    // items included in params
    const render = function (items) {
        $('modal').modal('hide');
        $('#sale-items').empty();

        //appending each item to the sale-items #
        items.forEach(function (item) {
            $('#sale-items').append(buildItemRow(item));
        });
    };
    //api call then call the render function
    // need to evoke the getITems func then restart our app
    // tr adds the data to a new row


    const getItems = function () {
        $.get('/api/products').then(render);

    };
    const buildItemRow = function (item) {
        const tr = $('<tr>');

        const input = $('<input>').attr({
            type: 'number',
            min: 0,
            id: item.id
        });
        const button = $('<button>')
            .addClass('btn btn-warning add-to-cart')
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
    const addCartRow = function (qty, item) {
        const itemTotal = item.price * qty;

        cartTotal += itemTotal;

        item.stock_quantity -= qty;

        cartItems.push(item);

        const tr = $('<tr>').addClass(`cart-${item.id}`);

        tr.append(
            $('<td>').text(qty),
            $('<td>').text(item.product_name),
            $('<td>').text(`$${item.price}`),
            $('<td>').text(`$${itemTotal.toFixed(2)}`)
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
            addCartRow(numRequested, data);
            message('success', 'Items successfully added to cart!');
            $(`#${data.id}`).val('');
        }
    };


    const checkout = function () {
        calculateTotal();

        cartItems.forEach(function(item) {
            $.ajax({
                method: 'PUT',
                url: `/api/products/${item.id}`,
                data: item
            });
        });

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
                i--;
                updateItem(i);
            });
        }else {
            $('#shopping-cart').modal('show');
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
    $('#cart').on('click', checkout);
    $('#checkout').on('click', getItems);
});

