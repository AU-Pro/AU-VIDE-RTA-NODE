import React from 'react'

export type CapsuleProps = {
  children: React.ReactNode
}
export type PageAddProps = Record<string, never>
export type PageSubProps = Record<string, never>
export type PageInputProps = Record<string, never>

export type PaginationType = React.FC<PaginationProps> & {
  Capsule: React.FC<CapsuleProps>
  PageAdd: React.FC<PageAddProps>
  PageSub: React.FC<PageSubProps>
  PageInput: React.FC<PageInputProps>
}

export type AliasKeyType = {
  pageNo?: string
  pageSize?: string
  totalCount?: string
}

export type PaginationOnChangePropsType = {
  currentPage: number
}

export type PaginationDataType = {
  pageNo?: number
  pageSize?: number
  totalCount?: number
  [key: string]: any
}

export interface PaginationProps {
  className?: string
  alias?: AliasKeyType
  disabled?: boolean
  pagination: PaginationDataType
  onChange?: (paginationOnChangeProps: PaginationOnChangePropsType) => void
}

export type UsePaginationMethodsTypes = {
  pagination: Required<PaginationDataType>
  maxPageNo: number
  inputValue: number
  handlePageGo: (value?: number) => void
  handlePageBack: (value?: number) => void
  handlePageChange: (value: number) => void
}

export interface UsePaginationMethodsProps {
  pagination: PaginationDataType
  alias?: AliasKeyType
  onChange?: (paginationOnChangeProps: PaginationOnChangePropsType) => void
}

export interface PaginationState {
  pagination: PaginationDataType
  inputValue: number
  maxPageNo: number
}

export type PaginationAction = (preState: PaginationState, payload: Partial<PaginationState>) => PaginationState

export interface PaginationContextType {
  disabled: boolean
  inputFocus: boolean
  hoverStatus: boolean
  paginationState: UsePaginationMethodsTypes
  setInputFocus: (inputFocus: boolean) => void
  setHoverStatus: (hoverStatus: boolean) => void
}
