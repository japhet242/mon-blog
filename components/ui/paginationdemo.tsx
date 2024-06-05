import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationDemo({handleChange,currentpage,totalpage}:{handleChange:(page:number)=>void,currentpage:number,totalpage:number}) {
  const changed = (number:number)=>{
    handleChange(number)
  }
  const previouspage = ()=>{
    if (currentpage > 1) {
      handleChange(currentpage-1)
    }
  }
const nextpage = ()=>{
  if (currentpage < totalpage) {
    handleChange(currentpage+1)
  }
}

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={()=>{
            previouspage()
          }}/>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={()=>changed(1)} isActive={currentpage==1 ? true : false} href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={()=>changed(2)} isActive={currentpage==2 ? true : false} href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={()=>changed(3)} isActive={currentpage==3 ? true : false}>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
        <PaginationLink href="#" onClick={()=>changed(totalpage)} isActive={currentpage==totalpage ? true : false} >{totalpage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={()=>nextpage()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
