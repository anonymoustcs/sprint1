CREATE TABLE Registration (

    CustomerID INT PRIMARY KEY NOT NULL,

    CustomerName VARCHAR(100) NOT NULL,

    Email VARCHAR(100) NOT NULL,

    Password VARCHAR(100) NOT NULL,

    Address VARCHAR(255) NOT NULL,

    ContactNumber BIGINT NOT NULL

);







INSERT INTO Registration (CustomerID, CustomerName, Email, Password, Address, ContactNumber)

VALUES 

(1, 'Sam', 'sam@example.com', 'pass123', 'RZ/12-4, Mahavir Enclave, New Delhi, India', 9123456789),

(2, 'John', 'john@example.com', 'john123', '42 Wallaby Way, Sydney, US', 8123456780),

(3, 'Amit', 'amit@example.com', 'amitpass', 'Bandra, Mumbai, India', 9988776655),

(4, 'Alex', 'alex@example.com', 'alexpass', 'Downtown, LA, US', 9111223344),

(5, 'Lisa', 'lisa@example.com', 'lisapass', 'Manchester, UK', 8899021122);









-- Update name for US customers

UPDATE Registration

SET CustomerName = 'US_'||CustomerName

WHERE Address LIKE '%US%';



-- Update name for Indian customers

UPDATE Registration

SET CustomerName = 'IN_'||CustomerName

WHERE Address LIKE '%India%';