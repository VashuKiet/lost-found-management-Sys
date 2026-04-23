const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Item = require('../models/Item');

// @route   POST /api/items
// @desc    Report a new lost/found item
// @access  Private
router.post('/items', auth, async (req, res) => {
  const { ItemName, Description, Type, Location, Date, ContactInfo } = req.body;

  try {
    const newItem = new Item({
      User_ID: req.user.id,
      ItemName,
      Description,
      Type,
      Location,
      Date: Date ? Date : undefined,
      ContactInfo
    });

    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/items
// @desc    Get all items of logged-in user (optional ?type=Lost|Found filter)
// @access  Private
router.get('/items', auth, async (req, res) => {
  try {
    const { type } = req.query;
    let query = { User_ID: req.user.id };

    if (type && type !== 'All') {
      query.Type = type;
    }

    const items = await Item.find(query).sort({ Date: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/items/:id
// @desc    Get a single item by ID
// @access  Private
router.get('/items/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    // Ensure the item belongs to the logged-in user
    if (item.User_ID.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/items/:id
// @desc    Update an item
// @access  Private
router.put('/items/:id', auth, async (req, res) => {
  const { ItemName, Description, Type, Location, Date, ContactInfo } = req.body;

  try {
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (item.User_ID.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: { ItemName, Description, Type, Location, Date, ContactInfo } },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/items/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (item.User_ID.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Item.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
