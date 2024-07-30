import React, { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
const CircularPagination = ({
    pageIndex,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    gotoPage,
  }) => {
    const [active, setActive] = useState(pageIndex);
  console.log("pageOptions", pageOptions)
    const handlePageClick = (page) => {
      setActive(page);
      gotoPage(page);
    };
  
    const renderPageButtons = () => {
      const totalPageCount = pageOptions.length -1;
      console.log("totalPageCount", totalPageCount)
  
      if (totalPageCount <= 5) {
        return pageOptions.map((page) => (
          <IconButton
            key={page}
            {...getItemProps(page)}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </IconButton>
        ));
      } else {
        const buttons = [];
        const startPage = Math.max(1, active - 2);
        const endPage = Math.min(startPage + 4, totalPageCount);
  
        if (startPage > 1) {
          buttons.push(
            <IconButton
              key={1}
              {...getItemProps(1)}
              onClick={() => handlePageClick(1)}
            >
              1
            </IconButton>
          );
          if (startPage > 2) {
            buttons.push(<span key="ellipsis-start">...</span>);
          }
        }
  
        for (let page = startPage; page <= endPage; page++) {
          buttons.push(
            <IconButton
              key={page}
              {...getItemProps(page)}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </IconButton>
          );
        }
  
        if (endPage < totalPageCount) {
          if (endPage < totalPageCount - 1) {
            buttons.push(<span key="ellipsis-end">...</span>);
          }
          buttons.push(
            <IconButton
              key={totalPageCount}
              {...getItemProps(totalPageCount)}
              onClick={() => handlePageClick(totalPageCount)}
            >
              {totalPageCount}
            </IconButton>
          );
        }
  
        return buttons;
      }
    };
  
    const getItemProps = (index) => ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => setActive(index),
      className: "rounded-full",
    });
  
    const next = () => {
      if (active < pageOptions.length) {
        handlePageClick(active + 1);
      }
    };
  
    const prev = () => {
      if (active > 1) {
        handlePageClick(active - 1);
      }
    };
  
    return (
      <div className="flex items-center gap-4">
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={prev}
          disabled={!canPreviousPage}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">{renderPageButtons()}</div>
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={next}
          disabled={!canNextPage}
        >
          Next 
        </Button>
      </div>
    );
  };
  
  export default CircularPagination;