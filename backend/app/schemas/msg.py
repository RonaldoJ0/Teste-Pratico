from typing import List

from pydantic import BaseModel


class Msg(BaseModel):
    msg: str

    class Config:
        schema_extra = {"example": {"msg": "Mensagem"}}


class Error(BaseModel):
    detail: List[Msg]

    class Config:
        schema_extra = {"example": {"detail": [{"msg": "Mensagem de erro"}]}}
