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
    const { img, title, deadline, shortDeadline, releaseDate, elibraryDate, mailDate, trackDate, model } = req.body;
    if (!title || !deadline || !releaseDate) {
        return res.status(400).json({ error: 'Обязательные поля: title, deadline, releaseDate' });
    }
    const newStock = stocksService.create({ img, title, deadline, shortDeadline, releaseDate, elibraryDate, mailDate, trackDate, model });
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


const parseDate = (str) => {
    const [day, month, year] = str.split('.');
    return new Date(year, month - 1, day);
};

const getDateStocks = (req, res) => {
    const { date } = req.params;
    const targetDate = parseDate(date);
    if (isNaN(targetDate.getTime())) {
        return res.status(400).json({ error: 'дата фигня' });
    }
    const stocks = stocksService.findAll();
    const result = stocks.filter(stock =>
        parseDate(stock['deadline']).getTime() >= targetDate.getTime()
    );
    res.json(result);
};

module.exports = {
    getAllStocks,
    getStockById,
    createStock,
    updateStock,
    deleteStock,
    getDateStocks
};


