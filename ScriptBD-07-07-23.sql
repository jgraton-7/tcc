CREATE DATABASE tomadas;

USE tomadas;

CREATE TABLE tbl_usuario(

	id_usuario				INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome_usuario 			VARCHAR(100) NOT NULL,
    email_usuario			VARCHAR(150) NOT NULL,
    senha_usuario			VARCHAR(150) NOT NULL,
    tipo_usuario			INT(1) NOT NULL,
    id_contratante_usuar	INT(10) NOT NULL

);

#Tabela incompleta
CREATE TABLE tbl_tomada(

	id_tomada				INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_contratante_tomad	INT(1) NOT NULL

);

CREATE TABLE tbl_contratante(

	id_contratante			INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    tipo_contratante		INT(1) NOT NULL,
    cpfcnpj_contratante		VARCHAR(20) NOT NULL,
	id_endereco_contr		INT(10) NOT NULL
    
);

CREATE TABLE tbl_endereco(

	id_endereco				INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cep_endereco			VARCHAR(9) NOT NULL,
    logradouro_endereco		VARCHAR(80) NOT NULL,
    bairro_endereco			VARCHAR(60) NOT NULL,
    cidade_endereco			VARCHAR(60) NOT NULL,
    estado_endereco			CHAR(2) NOT NULL

);

ALTER TABLE tbl_tomada
ADD CONSTRAINT fk_id_contratante_tomad
FOREIGN KEY (id_contratante_tomad)
REFERENCES tbl_contratante(id_contratante);

ALTER TABLE tbl_usuario
ADD CONSTRAINT fk_id_contratante_usuar
FOREIGN KEY (id_contratante_usuar)
REFERENCES tbl_contratante(id_contratante);

ALTER TABLE tbl_contratante
ADD CONSTRAINT fk_id_endereco_contr
FOREIGN KEY (id_endereco_contr)
REFERENCES tbl_endereco(id_endereco);
