CREATE TABLE Product (
    ProductID INT PRIMARY KEY NOT NULL,
    ProductName VARCHAR(100) NOT NULL,
    Price INT NOT NULL,
    Quantity INT NOT NULL,
    Reserved VARCHAR(10) NOT NULL CHECK (Reserved IN ('Yes','No')),
    CustomerID INT NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Registration(CustomerID)
);

INSERT INTO Product (ProductID, ProductName, Price, Quantity, Reserved, CustomerID) VALUES
(101, 'Rice', 50, 100, 'No', 1),
(102, 'Wheat Flour', 40, 80, 'No', 2),
(103, 'Sugar', 45, 90, 'No', 3),
(104, 'Milk', 25, 50, 'Yes', 1),
(105, 'Butter', 60, 30, 'Yes', 2),
(106, 'Eggs', 70, 60, 'Yes', 1),
(107, 'Salt', 10, 120, 'No', 4),
(108, 'Tea', 150, 25, 'Yes', 3),
(109, 'Coffee', 200, 15, 'No', 5);

UPDATE Product
SET Quantity = Quantity + 1,
    Reserved = 'No'
WHERE ProductID = 104;

SELECT DISTINCT
    R.CustomerID,
    R.CustomerName,
    P.ProductID,
    P.ProductName,
    P.Price,
    P.Reserved
FROM
    Product P
JOIN
    Registration R ON P.CustomerID = R.CustomerID
ORDER BY R.CustomerID, P.ProductName;
