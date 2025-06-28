 create table cust_details (

  cust_id int not null,

  last_login datetime not null,

  last_logout datetime not null,

  updated_password varchar(255) not null,

  old_password varchar(255) not null,

  is_now_logged_in varchar(1) Not null

);







insert into Cust_details (cust_id,last_login,last_logout,updated_password,old_password,is_now_logged_in) values

(1, '2025-06-19 09:30:00','2025-06-19 10:30:00','abc123New!','abc123qw','Y') ,

(2, '2025-06-19 08:30:00','2025-06-19 10:30:00','abc123New!','abc12385','N'), 

(12, '2025-06-19 19:30:00','2025-06-19 22:30:00','abc123Ngvfw!','abc123mnbm','N'), 

(16, '2025-06-19 01:30:00','2025-06-19 03:30:00','abc123Nefw!','abc12hlk3','N'), 

(18, '2025-06-19 05:30:00','2025-06-19 10:30:00','abc123Nefdvw!','abc123iopui','N'), 

(71, '2025-06-19 08:30:00','2025-06-19 11:30:00','abc123Nefcew!','abcopoip123','Y'), 

(19, '2025-06-19 04:30:00','2025-06-19 06:30:00','abc123Nwefew!','abopc123','Y'), 

(15, '2025-06-19 02:30:00','2025-06-19 04:30:00','abc123Nwefew!','abc123Nwefew!','Y'), 

(11, '2025-06-19 03:30:00','2025-06-19 07:30:00','abc123N234ew!','abc123yhty','Y'), 

(18, '2025-06-19 10:30:00','2025-06-19 11:30:00','abc123Njmjew!','abc123yjyt','Y') ;





select *

from Cust_details

where is_now_logged_in='Y'

order by last_login

limit(

  select ceil(count(*)*0.5)

  from Cust_details



where is_now_logged_in='Y'

);

