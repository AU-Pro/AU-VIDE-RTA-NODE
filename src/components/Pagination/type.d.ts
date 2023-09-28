import React from 'react'

export type AliasKeyType = {
  pageNo?: string
  pageSize?: string
  totalCount?: string
}

export type PaginationOnChangePropsType = {
  currentPage: number
}

export type PaginationType = {
  pageNo?: number
  pageSize?: number
  totalCount?: number
  [key: string]: any
}

export interface PaginationProps {
  className?: string
  alias?: AliasKeyType
  disabled?: boolean
  style?: React.CSSProperties
  pagination: PaginationType
  onChange?: (paginationOnChangeProps: PaginationOnChangePropsType) => void
}

export type UsePaginationMethodsTypes = {
  pagination: Required<PaginationType>
  maxPageNo: number
  inputValue: number
  handlePageGo: (value?: number) => void
  handlePageBack: (value?: number) => void
  handlePageChange: (value: number) => void
}

export interface UsePaginationMethodsProps {
  pagination: PaginationType
  alias?: AliasKeyType
  onChange?: (paginationOnChangeProps: PaginationOnChangePropsType) => void
}

export interface PaginationState {
  pagination: PaginationType
  inputValue: number
  maxPageNo: number
}

export type PaginationAction = (preState: PaginationState, payload: Partial<PaginationState>) => PaginationState
