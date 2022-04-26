from typing import Optional

from pydantic import BaseModel, Field


# Propriedades compartilhadas
class UserBase(BaseModel):
    name: Optional[str] = Field(
        None, max_length=255, description="Nome do Cliente ou Fornecedor"
    )
    phone: Optional[str] = Field(None, max_length=11, description="Telefone")
    ident_doc: Optional[str] = Field(
        None,
        min_length=11,
        max_length=14,
        description="Documento de identificação (CPF ou CNPJ)",
    )
    zip_code: Optional[str] = Field(None, min_length=8, max_length=8, description="CEP")
    street: Optional[str] = Field(None, max_length=255, description="Rua")
    district: Optional[str] = Field(None, max_length=50, description="Bairro")
    city: Optional[str] = Field(None, max_length=50, description="Cidade")
    state: Optional[str] = Field(None, min_length=2, max_length=2, description="Estado")
    ibge: Optional[str] = Field(
        None, min_length=7, max_length=7, description="Código IBGE"
    )

    class Config:
        schema_extra = {
            "examples": {
                "cliente": {
                    "summary": "Exemplo de um cliente",
                    "description": "Um exemplo de dados de um cliente",
                    "value": {
                        "name": "Liz Alessandra Gabriela de Paula",
                        "phone": "27988793287",
                        "ident_doc": "62538519934",
                        "zip_code": "29136281",
                        "street": "Rua dos Lírios",
                        "district": "Arlindo Villaschi",
                        "city": "Viana",
                        "state": "ES",
                        "ibge": "3205101",
                    },
                },
                "fornecedor": {
                    "summary": "Exemplo de um fornecedor",
                    "description": "Um exemplo de dados de um fornecedor",
                    "value": {
                        "name": "Cometa Moto Center Participacoes LTDA",
                        "phone": "6521221085",
                        "ident_doc": "20097992000124",
                        "zip_code": "78200870",
                        "street": "Rua Juscelino Kubitschek",
                        "district": "Junco",
                        "city": "Cáceres",
                        "state": "MT",
                        "ibge": "5102504",
                    },
                },
            }
        }


# Propriedades recebidas via API ao CRIAR
class UserCreate(UserBase):
    name: str = Field(..., max_length=255, description="Nome do Cliente ou Fornecedor")
    phone: str = Field(..., max_length=11, description="Telefone")
    ident_doc: str = Field(
        ...,
        min_length=11,
        max_length=14,
        description="Documento de identificação (CPF ou CNPJ)",
    )
    zip_code: str = Field(..., min_length=8, max_length=8, description="CEP")
    street: str = Field(..., max_length=255, description="Rua")
    district: str = Field(..., max_length=50, description="Bairro")
    city: str = Field(..., max_length=50, description="Cidade")
    state: str = Field(..., min_length=2, max_length=2, description="Estado")
    ibge: str = Field(..., min_length=7, max_length=7, description="Código IBGE")


# Propriedades recebidas via API ao ATUALIZAR
class UserUpdate(UserBase):
    pass


class UserInDBBase(UserBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": 1,
                "name": "Nome Exemplo",
                "phone": "68996333802",
                "ident_doc": "81278673903",
                "zip_code": "99999999",
                "street": "Rua Teste",
                "district": "Teste",
                "city": "Teste",
                "state": "EX",
                "ibge": "9999999",
            }
        }


class User(UserInDBBase):
    pass
