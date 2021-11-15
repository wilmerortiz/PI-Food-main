import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const Paginate = ({handlePrev, pageDecrement, renderPageNumbers, pageIncrement,currentPage, handleNext, pages}) => {
    return(
        <div className="actions-paginate">
            <ul className="paginate">
                <li className="paginate-prev">
                    <button onClick={handlePrev}
                            disabled={currentPage === pages[0] ? true : false}
                    >
                        <FontAwesomeIcon icon="fa-solid fa-chevron-left" size="lg"/>
                    </button>
                </li>
                {pageDecrement}
                {renderPageNumbers}
                {pageIncrement}

                <li className="paginate-next">
                    <button onClick={handleNext}
                            disabled={currentPage === pages[pages.length - 1] ? true : false}
                    >
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" size="lg" />
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Paginate