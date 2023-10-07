#### 方式一：直接使用 <Pagination />

```ts
import Pagination from 'src/@components/Pagination';

const Index: FC<IndexProps> = () => {
    ...
    // 当参数为非公司标准时，例如在使用 ahooks 对接口进行封装的情况下
    const pageAliasConfig = {
        pageNo: 'pageNum',
        totalCount: 'totalNum'
    }
    const [pagination, setPagination] = useState({
        pageNum: 1,
        pageSize: 10,
        totalNum: 0,
    })

    const onPageChange = async ({currentPage}) => {
        await fetchList(currentPage)
    }

    ...

    return (
        <Pagination
            pagination={pagination}
            alias={pageAliasConfig}
            onChange={onPageChange}
            className={styles.pagination}
        />
    );
}
```

#### 方式二：使用 hooks

```ts
import {usePaginationMethods} from 'src/@components/Pagination';

const Index: FC<IndexProps> = (props) => {
    const {pagination} = props;
    ...
    const {
        pagination: {pageNo, pageSize, totalCount},
        inputValue,
        handlePageGo,
        handlePageBack,
        handlePageChange,
    } = usePaginationMethods({
        pagination,
        onChange,
        alias,
    });

    const handleInput = e => {
        handlePageChange(e.target.value);
    }

    useEffect(() => {
        fetchList(pageNo)
    }, [pagination.pageNo])

    ...

    return (
        <div>
            <span>当前页码: {pagination.pageNo}</span>
            <span>一页数量: {pagination.pageSize}</span>
            <span>总数量: {pagination.totalCount}</span>

            <Button onClick={handlePageBack} >SUB PAGE</Button>
            <Input value={inputValue} onChange={handleInput} />
            <Button onClick={handlePageGo} >ADD PAGE</Button>
        </div>
    );
}
```

#### 方式三：使用已封装的组件

```ts
import Pagination from 'src/@components/Pagination';
import { ColumnWidthOutlined } from '@ant-design/icons'

const {Capsule, PageAdd, PageSub, PageInput} = Pagination;

const pageAliasConfig = {
  pageNo: 'current',
  totalCount: 'total'
}

const Index: FC<IndexProps> = (props) => {
    const {pagination} = props;
    ...
    const handlePageChange = useCallback(
      ({ currentPage }) => {
        pagination.onChange(currentPage, pagination.pageSize)
      },
      [pagination]
    )

    ...

    return (
      <Pagination pagination={pagination} alias={pageAliasConfig} onChange={handlePageChange}>
        <Capsule>
          <PageSub />

          {/* 任意组合进需要的 dom */}
          <ColumnWidthOutlined style={{ margin: '0px 12px', color: '#bfbfbf' }} />

          <PageInput />

          <PageAdd />
        </Capsule>
      </Pagination>
    );
}
```
