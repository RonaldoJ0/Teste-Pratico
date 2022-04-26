from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app import crud, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schemas.User])
async def read_users(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = Query(
        default=0,
        description="Número de linhas a serem ignoradas antes de começar a retornar as linhas da consulta.",
    ),
    limit: int = Query(
        default=100,
        description="Número de linhas que devem ser retornadas no resultado da consulta.",
    ),
) -> Any:
    """
    _Retorna todos os usuários cadastrados de forma paginada._
    """
    users = await crud.user.get_multi(db, skip=skip, limit=limit)
    return users


@router.post(
    "/",
    status_code=201,
    response_model=schemas.Msg,
    responses={
        201: {
            "model": schemas.Msg,
            "description": "User Created Successfully",
        },
        409: {
            "model": schemas.Error,
            "description": "Identification document already exists",
        },
    },
)
async def create_user(
    *,
    db: AsyncSession = Depends(deps.get_db),
    user_in: schemas.UserCreate = Body(
        ..., examples=schemas.UserCreate.Config.schema_extra["examples"]
    )
) -> Any:
    """
    _Cria um novo usuário (Cliente ou Fornecedor)._
    """
    user = await crud.user.get_by_ident_doc(db=db, ident_doc=user_in.ident_doc)
    if user:
        raise HTTPException(
            status_code=409,
            detail=[{"msg": "O documento de identificação ja esta em uso."}],
        )
    await crud.user.create(db, obj_in=user_in)
    return {"msg": "Created"}


@router.get(
    "/{id}",
    response_model=schemas.User,
    responses={
        404: {
            "model": schemas.Error,
            "description": "User not found",
        },
    },
)
async def get_user_by_id(
    id: int,
    db: AsyncSession = Depends(deps.get_db),
) -> Any:
    """
    _Retorna usuário._
    """
    user = await crud.user.get(db, id=id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail=[
                {"msg": "Usuário não encontrado."},
            ],
        )
    return user


@router.put(
    "/{id}",
    response_model=schemas.Msg,
    responses={
        404: {
            "model": schemas.Error,
            "description": "User not found",
        },
        409: {
            "model": schemas.Error,
            "description": "Identification document already exists",
        },
    },
)
async def update_user(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: int,
    user_in: schemas.UserUpdate = Body(
        ..., examples=schemas.UserUpdate.Config.schema_extra["examples"]
    )
) -> Any:
    """
    _Atualiza dados de um usuário._
    """
    user = await crud.user.get(db, id=id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail=[
                {"msg": "Usuário não encontrado."},
            ],
        )
    user_ident = await crud.user.get_by_ident_doc(db=db, ident_doc=user_in.ident_doc)
    if user_ident:
        raise HTTPException(
            status_code=409,
            detail=[{"msg": "O documento de identificação ja esta em uso."}],
        )
    await crud.user.update(db, db_obj=user, obj_in=user_in)
    return {"msg": "OK"}


@router.delete("/{id}", response_model=schemas.Msg)
async def delete_user(id: int, db: AsyncSession = Depends(deps.get_db)) -> Any:
    """
    _Deleta usuário._
    """
    user = await crud.user.get(db, id=id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail=[{"msg": "Usuário não encontrado."}],
        )
    await crud.user.remove(db, id=id)
    return {"msg": "OK"}
