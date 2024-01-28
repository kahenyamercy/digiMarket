-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS digi_market;
CREATE USER IF NOT EXISTS 'digiMarket_dev'@'localhost' IDENTIFIED BY '12345678';
GRANT ALL PRIVILEGES ON `hbnb_dev_db`.* TO 'digiMarket_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'digiMarket_dev'@'localhost';
FLUSH PRIVILEGES;