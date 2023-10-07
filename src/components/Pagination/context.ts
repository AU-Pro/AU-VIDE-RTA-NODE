import { createContext } from 'react'
import { PaginationContextType } from './type'

const PaginationContextState: PaginationContextType = {
  disabled: true,
  inputFocus: false,
  hoverStatus: false,
  setInputFocus: () => {},
  setHoverStatus: () => {},
  paginationState: {
    pagination: {
      pageNo: 1,
      pageSize: 10,
      totalCount: 0
    },
    inputValue: 1,
    maxPageNo: 1,
    handlePageGo: () => {},
    handlePageBack: () => {},
    handlePageChange: () => {}
  }
}

export const PaginationContext = createContext<PaginationContextType>(PaginationContextState)

export default { PaginationContext }
