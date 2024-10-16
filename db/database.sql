create table produto(
  id serial not null,
  descricao varchar(200) not null,
  preco float not null,
  estoque int not null default 0,
  CONSTRAINT produto_pkey PRIMARY KEY (id)
);

create table usuario(
  id serial not null,
  nome varchar(200) not null,
  email varchar(200) not null,
  senha varchar(200) not null,
  CONSTRAINT usuario_pkey PRIMARY KEY (id)
);


