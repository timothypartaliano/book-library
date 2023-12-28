const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
    },
    author: {
        type: DataTypes.STRING(255),
    },
    summary: {
        type: DataTypes.TEXT,
    },
    publisher: {
        type: DataTypes.STRING(255),
    },
    pageCount: {
        type: DataTypes.INTEGER,
        field: 'pagecount',
    },
    readPage: {
        type: DataTypes.INTEGER,
        field: 'readpage',
    },
    finished: {
        type: DataTypes.BOOLEAN,
    },
    reading: {
        type: DataTypes.BOOLEAN,
    },
    insertedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'insertedat',
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updatedat',
    },
}, {
    tableName: 'books',
    timestamps: false,
});

module.exports = Book;