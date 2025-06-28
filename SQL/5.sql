CREATE TABLE Admin (

    AdminID INT PRIMARY KEY NOT NULL,

    AdminPassword VARCHAR(100) NOT NULL,

    CustomerID INT NOT NULL,

    ProductID INT NOT NULL,

    TransactionID INT NOT NULL,

    FOREIGN KEY (CustomerID) REFERENCES Registration(CustomerID),

    FOREIGN KEY (ProductID) REFERENCES Product(ProductID),

    FOREIGN KEY (TransactionID) REFERENCES TransactionTable(TransactionID)

);





INSERT INTO Admin (AdminID, AdminPassword, CustomerID, ProductID, TransactionID)

VALUES 

(1, 'admin@123', 1, 101, 1),

(2, 'admin@123', 1, 104, 2),

(3, 'admin@123', 2, 102, 3),

(4, 'admin@123', 2, 105, 4),

(5, 'admin@123', 3, 108, 5),

(6, 'admin@123', 3, 103, 6),

(7, 'admin@123', 5, 

109, 7);





SELECT 

    R.CustomerID,

    R.CustomerName,

    R.Email,

    R.Address,

    R.ContactNumber,

    T.TransactionID,

    P.ProductName,

    T.TotalAmount,

    T.No_Of_Items

FROM 

    Admin A

JOIN 

    Registration R ON A.CustomerID = R.CustomerID

JOIN 

    Product P ON A.ProductID = P.ProductID

JOIN 

    TransactionTable T ON A.TransactionID = T.TransactionID

WHERE 

    P.Reserved = 'Yes' -- Assuming 'Reserved' = 'Yes' means order placed

ORDER BY 



    T.TransactionID;