
# MERN Stack Transactions Dashboard

This project is a MERN stack application that allows users to interact with transaction data. It provides features to list transactions, filter them by month, search for specific transactions, and visualize sales data using charts.


## Features

- **Transactions Table**: Displays transaction data including ID, title, description, price, category, and sold status.
- **Month Filter**: Select a month (0 for January to 11 for December) to filter transactions.
- **Search Functionality**: Search transactions by title, description, or price.
- **Pagination**: Navigate through transaction records with next and previous buttons.
- **Statistics Overview**: Displays total sales amount, total sold items, and total not sold items for the selected month.
- **Bar Chart**: Visualizes the number of items sold in various price ranges.
- **Pie Chart**: Displays the distribution of items across different categories.


## Tech Stack

**Frontend**: React with Vite, Tailwind CSS

**Backend**: Node.js, Express.js

**Database**: MongoDB


## Installation

**Prerequisites**
- Node.js
- MongoDB

**Clone the Repository**

```bash
  git clone <repository-url>
  cd <repository-folder>
```

**Backend setup**

```bash
  cd backend
  npm install
  npm start
```

**Frontend setup**

```bash
  cd frontend
  npm install
  npm start
```


## API Endpoints

#### Fetch All Transactions

```http
  GET /api/transactions
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `month` | `int` | (0-11) Index of the month. |
| `search` | `string` | Search term. |
| `page` | `int` | Page number for pagination. |
| `perPage` | `int` | Number of records per page. |


#### Get statistics for selected month

```http
  GET /api/statistics
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `month`      | `int` | **Required**. (0-11) Index of the month. |


#### Get bar chart data for selected month

```http
  GET /api/barchart
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `month`      | `int` | **Required**. (0-11) Index of the month. |


#### Get pie chart data for selected month

```http
  GET /api/piechart
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `month`      | `int` | **Required**. (0-11) Index of the month. |

####  Get combined data from statistics, bar chart, and pie chart APIs.

```http
  GET /api/combined
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `month`      | `int` | **Required**. (0-11) Index of the month. |




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

for testing use: mongodb+srv://MasterVarad:Varad098@cluster0.jhxukf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



## Screenshots

Screenshot 1: 
![App Screenshot](https://firebasestorage.googleapis.com/v0/b/beaesthetic-1abc9.appspot.com/o/Screenshot%202024-09-28%20215353.png?alt=media&token=18c44dd8-c229-4e14-9e72-24d323a283e4)

Screenshot 2: 
![App Screenshot](https://firebasestorage.googleapis.com/v0/b/beaesthetic-1abc9.appspot.com/o/Screenshot%202024-09-28%20215406.png?alt=media&token=15a8f8c8-7253-480c-9ae2-492e5c86795b)



## Author

- Github: [@devVaradPatil](https://github.com/devVaradPatil/)
- Linkedin: [Varad Patil](https://www.linkedin.com/in/varad-patil-web-dev/)

