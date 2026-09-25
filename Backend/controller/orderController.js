const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            orderItems,
            user: req.user._id, // From protect middleware
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        const createdOrder = await order.save();

        // 🌟 Real-World Addition: Reduce product stock count after order is placed
        for (let item of orderItems) {
            const product = await Product.findById(item.product);
            if (product) {
                product.countInStock -= item.quantity;
                await product.save();
            }
        }
        
        res.status(201).json({ message: 'Order created successfully', data: createdOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Server Error: ${err.message}` });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        // Populate user name and email from User model reference
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order found', data: order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Server Error: ${err.message}` });
    }
};

// @desc    Get logged-in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json({ message: 'User orders fetched', data: orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Server Error: ${err.message}` });
    }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name');
        res.status(200).json({ message: 'All orders fetched', data: orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Server Error: ${err.message}` });
    }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        };

        const updatedOrder = await order.save();
        res.status(200).json({ message: 'Order marked as paid', data: updatedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Server Error: ${err.message}` });
    }
};

// @desc    Update order status to delivered / shipped (Admin only)
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.isDelivered = true;
        order.deliveredAt = Date.now();
        order.orderStatus = 'Delivered';

        const updatedOrder = await order.save();
        res.status(200).json({ message: 'Order marked as delivered', data: updatedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Server Error: ${err.message}` });
    }
};

module.exports = {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders,
    updateOrderToPaid,
    updateOrderToDelivered
};