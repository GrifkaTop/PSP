const stocksService = require('../services/stocksService');

const getAllStocks = (req, res) => {
    const { title } = req.query;
    const stocks = stocksService.findAll(title);
    res.json(stocks);
};

const getStockById = (req, res) => {
    const id = parseInt(req.params.id);
    const stock = stocksService.findOne(id);
    if (!stock) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    res.json(stock);
};

const createStock = (req, res) => {
    const { img, title, deadline, shortDeadline, releaseDate, elibraryDate, mailDate, trackDate } = req.body;
    if (!title || !deadline || !releaseDate) {
        return res.status(400).json({ error: 'Обязательные поля: title, deadline, releaseDate' });
    }
    const newStock = stocksService.create({ img, title, deadline, shortDeadline, releaseDate, elibraryDate, mailDate, trackDate });
    res.status(201).json(newStock);
};

const updateStock = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedStock = stocksService.update(id, req.body);
    if (!updatedStock) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    res.json(updatedStock);
};

const deleteStock = (req, res) => {
    const id = parseInt(req.params.id);
    const success = stocksService.remove(id);
    if (!success) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    res.status(204).send();
};

module.exports = {
    getAllStocks,
    getStockById,
    createStock,
    updateStock,
    deleteStock
};
