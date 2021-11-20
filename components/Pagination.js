import React from 'react';
import Link from "next/link";
import {PER_PAGE} from "@/config/index";

const Pagination = ({page, total}) => {
    const lasPage = Math.ceil(total / PER_PAGE)
    return (
        <div>
            {page > 1 && (
                <Link href={`/events?page=${page - 1}`}>
                    <a className='btn-secondary'>Prev</a>
                </Link>
            )}
            {page < lasPage && (
                <Link href={`/events?page=${page + 1}`}>
                    <a className='btn-secondary'>Next</a>
                </Link>
            )}
        </div>
    );
};

export default Pagination;
