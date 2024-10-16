insert into produto(descricao,preco,estoque) values ('Computador', 2500, 100);
insert into produto(descricao,preco,estoque) values ('Mouse', 50, 100);
insert into produto(descricao,preco,estoque) values ('Teclado', 200, 100);
insert into produto(descricao,preco,estoque) values ('Monitor', 2500, 100);
insert into produto(descricao,preco,estoque) values ('Placa de Vídeo', 2500, 100);
insert into produto(descricao,preco,estoque) values ('Mouse Pad', 70, 100);
insert into produto(descricao,preco,estoque) values ('Notebook', 5500, 100);

--usuarios
insert into usuario(nome,email,senha) values ('Admin', 'admin@email.com', '123456');
insert into usuario(nome,email,senha) values ('Bruna', 'admin@email.com', '123456');
insert into usuario(nome,email,senha) values ('Romulo', 'admin@email.com', '123456');
insert into usuario(nome,email,senha) values ('Vinicius', 'admin@email.com', '123456');
insert into usuario(nome,email,senha) values ('Ryan', 'admin@email.com', '123456');
insert into usuario(nome,email,senha) values ('Helton', 'admin@email.com', '123456');
insert into usuario(nome,email,senha) values ('Cauê', 'admin@email.com', '123456');

update usuario set email = 'bruna@email.com' where id = 2;
update usuario set email = 'romulo@email.com' where id = 3;
update usuario set email = 'vinicius@email.com' where id = 4;
update usuario set email = 'ryan@email.com' where id = 5;
update usuario set email = 'helton@email.com' where id = 6;
update usuario set email = 'caue2email.com' where id = 7;