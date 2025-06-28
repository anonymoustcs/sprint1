CREATE TABLE TransactionTable (
    TransactionID INT PRIMARY KEY NOT NULL,
    CustomerID INT NOT NULL,
    ProductID INT NOT NULL,
    TotalAmount INT NOT NULL,
    No_Of_Items INT NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Registration(CustomerID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

INSERT INTO TransactionTable (TransactionID, CustomerID, ProductID, TotalAmount, No_Of_Items)
VALUES
(1, 1, 101, 50, 1), -- Rice
(2, 1, 104, 25, 1), -- Milk
(3, 2, 102, 40, 1), -- Wheat Flour
(4, 2, 105, 60, 1), -- Butter
(5, 3, 108, 150, 1), -- Tea
(6, 3, 103, 45, 1), -- Sugar
(7, 5, 109, 200, 1); -- Coffee

-- Query 1
SELECT * 
FROM TransactionTable
ORDER BY TotalAmount DESC;

-- Query 2: Second highest total amount
SELECT * 
FROM TransactionTable
WHERE TotalAmount = (
    SELECT DISTINCT TotalAmount 
    FROM TransactionTable
    ORDER BY TotalAmount DESC
    LIMIT 1 OFFSET 1
);
