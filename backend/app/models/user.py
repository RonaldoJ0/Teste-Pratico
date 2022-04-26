from sqlalchemy import CHAR, Column, Integer, String
from app.db.base_class import Base

# Tabela de Usuario (Fornecedores e Clientes)
class User(Base):
    id = Column(Integer, primary_key=True)  # Campo de ID
    name = Column(String, nullable=False)  # Campo de Nome
    phone = Column(String(11), nullable=False)  # Campo de Telefone
    ident_doc = Column(String(14), unique=True, nullable=False)  # Campo de CPF ou CNPJ
    zip_code = Column(CHAR(8), nullable=False)  # Campo de CEP
    street = Column(String, nullable=False)  # Campo de Rua
    district = Column(String(50), nullable=False)  # Campo de Bairro
    city = Column(String(50), nullable=False)  # Campo de Cidade
    state = Column(CHAR(2), nullable=False)  # Campo de Estado
    ibge = Column(CHAR(7), nullable=False)  # Campo de Código IBGE